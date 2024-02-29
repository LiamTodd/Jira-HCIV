import { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import {
  ADDITIONAL_FIELDS,
  BULK_PREDICT_FUNCTION_KEY,
  DASHBOARD_BACKGROUND,
  FIELDS_FOR_CLASSIFIER,
  WHITE,
} from './constants';
import {
  getAllIssues,
  getAllPriorities,
  getAllStatuses,
} from './utils/requestJiraUtils';
import { constructBulkPayload } from './utils/misc';
import GroupedBar from './components/GroupedBar';
import {
  combinedClassificationPriorityGroupedPrepFunc,
  combinedClassificationStatusGroupedPrepFunc,
} from './utils/dataPrepFunctions';
import Checkbox from '@mui/material/Checkbox';
import BasicDistributionGroup from './components/BasicDistributionGroup';
import { AppBar, Box, Grid, Typography } from '@mui/material';
import KeyStats from './components/KeyStats';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const [predictionData, setPredictionData] = useState();
  const [statuses, setStatuses] = useState();
  const [priorities, setPriorities] = useState();
  useEffect(() => {
    getAllStatuses().then((statusData) => {
      setStatuses(statusData);
    });
  }, []);
  useEffect(() => {
    getAllPriorities().then((priorityData) => {
      setPriorities(priorityData);
    });
  }, []);

  useEffect(() => {
    getAllIssues(
      FIELDS_FOR_CLASSIFIER.concat(ADDITIONAL_FIELDS.map((field) => field.name))
    ).then((issueData) => {
      issueData.forEach((item, index) => {
        item.id = index;
      });
      invoke(BULK_PREDICT_FUNCTION_KEY, constructBulkPayload(issueData)).then(
        (returnedData) => {
          returnedData.forEach((item, index) => {
            // recover fields which were not sent to classifier
            ADDITIONAL_FIELDS.forEach((field) => {
              if (issueData[index].fields[field.name] !== null) {
                item[field.name] =
                  issueData[index].fields[field.name][field.prop];
              }
            });
          });
          setPredictionData(returnedData);
        }
      );
    });
  }, []);

  const [showNonHci, setShowNonHci] = useState(false);

  const handleSetShowNonHci = (event) => {
    setShowNonHci(event.target.checked);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* dashboard tools */}
      <AppBar
        sx={{
          backgroundColor: WHITE,
          color: 'black',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1vw',
        }}
      >
        <Typography>Show Non-Human Centric Issues</Typography>
        <Checkbox
          checked={showNonHci}
          onChange={handleSetShowNonHci}
        ></Checkbox>
        <Typography>Filter by Date Raised</Typography>
        <DatePicker label='From' />
        <DatePicker label='To' />
      </AppBar>

      <Box
        sx={{
          backgroundColor: DASHBOARD_BACKGROUND,
          padding: '1vw',
          marginTop: '24vh',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {predictionData && statuses && priorities ? (
              <KeyStats
                data={predictionData}
                statuses={statuses}
                priorities={priorities}
              ></KeyStats>
            ) : (
              <div>Loading...</div>
            )}
          </Grid>

          <Grid container item xs={12}>
            {predictionData ? (
              <BasicDistributionGroup
                data={predictionData}
                showNonHci={showNonHci}
              ></BasicDistributionGroup>
            ) : (
              <div>Loading...</div>
            )}
          </Grid>

          <Grid item xs={6}>
            {predictionData && priorities ? (
              <GroupedBar
                data={predictionData}
                dataPrepFunc={combinedClassificationPriorityGroupedPrepFunc}
                title={'Human-Centric Issues Grouped by Priority'}
                showNonHci={showNonHci}
                groups={priorities}
                stacked={true}
              ></GroupedBar>
            ) : (
              <div>Loading...</div>
            )}
          </Grid>

          <Grid item xs={6}>
            {predictionData && statuses ? (
              <GroupedBar
                data={predictionData}
                dataPrepFunc={combinedClassificationStatusGroupedPrepFunc}
                title={'Human-Centric Issues Grouped by Status'}
                showNonHci={showNonHci}
                groups={statuses}
                stacked={false}
              ></GroupedBar>
            ) : (
              <div>Loading...</div>
            )}
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}

export default App;
