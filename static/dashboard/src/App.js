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
import { HideOnScroll, constructBulkPayload } from './utils/misc';
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
import dayjs from 'dayjs';
import IssueList from './components/IssueList';

function App() {
  const [originalPredictionData, setOriginalPredictionData] = useState();
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
            item.key = issueData[index].key;
            ADDITIONAL_FIELDS.forEach((field) => {
              if (issueData[index].fields[field.name] !== null) {
                if (field.prop !== null) {
                  item[field.name] =
                    issueData[index].fields[field.name][field.prop];
                } else {
                  item[field.name] = issueData[index].fields[field.name];
                }
              }
            });
          });
          setOriginalPredictionData(returnedData);
        }
      );
    });
  }, []);

  const [showNonHci, setShowNonHci] = useState(false);

  const handleSetShowNonHci = (event) => {
    setShowNonHci(event.target.checked);
  };

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  useEffect(() => {
    if (originalPredictionData !== null) {
      if (fromDate || toDate) {
        const filteredPredictionData = originalPredictionData
          .filter((issue) => {
            if (fromDate) {
              return (
                dayjs(issue.created).isSame(dayjs(fromDate), 'day') ||
                dayjs(issue.created).isAfter(dayjs(fromDate), 'day')
              );
            }
            return true;
          })
          .filter((issue) => {
            if (fromDate) {
              return (
                dayjs(issue.created).isSame(dayjs(toDate), 'day') ||
                dayjs(issue.created).isBefore(dayjs(toDate), 'day')
              );
            }
            return true;
          });
        setPredictionData(filteredPredictionData);
      } else {
        // initialisation
        setPredictionData(originalPredictionData);
      }
    }
  }, [fromDate, toDate, originalPredictionData]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* dashboard tools */}
      <HideOnScroll>
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
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant='subtitle1'>
                Show Non-Human Centric Issues
              </Typography>
              <Checkbox
                checked={showNonHci}
                onChange={handleSetShowNonHci}
              ></Checkbox>
            </Grid>

            <Grid item xs={8}>
              <Typography variant='subtitle1'>
                Filter by Date Created
              </Typography>
              <Box display='flex' gap={2}>
                <DatePicker
                  label='From'
                  onChange={(newDate) => setFromDate(newDate)}
                  slotProps={{
                    field: { clearable: true },
                  }}
                />

                <DatePicker
                  label='To'
                  onChange={(newDate) => setToDate(newDate)}
                  slotProps={{
                    field: { clearable: true },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </AppBar>
      </HideOnScroll>

      <Box
        sx={{
          backgroundColor: DASHBOARD_BACKGROUND,
          padding: '1vw',
          marginTop: '30vh',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {predictionData &&
            predictionData.length > 0 &&
            statuses &&
            priorities ? (
              <KeyStats
                data={predictionData}
                statuses={statuses}
                priorities={priorities}
              ></KeyStats>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            {predictionData &&
            predictionData.length > 0 &&
            statuses &&
            priorities ? (
              <IssueList
                data={predictionData}
                showNonHci={showNonHci}
                statuses={statuses}
                priorities={priorities}
              ></IssueList>
            ) : null}
          </Grid>

          <Grid container item xs={12}>
            {predictionData && predictionData.length > 0 ? (
              <BasicDistributionGroup
                data={predictionData}
                showNonHci={showNonHci}
              ></BasicDistributionGroup>
            ) : null}
          </Grid>

          <Grid item xs={6}>
            {predictionData && predictionData.length > 0 && priorities ? (
              <GroupedBar
                data={predictionData}
                dataPrepFunc={combinedClassificationPriorityGroupedPrepFunc}
                title={'Human-Centric Issues Grouped by Priority'}
                showNonHci={showNonHci}
                groups={priorities}
                stacked={true}
              ></GroupedBar>
            ) : null}
          </Grid>

          <Grid item xs={6}>
            {predictionData && predictionData.length > 0 && statuses ? (
              <GroupedBar
                data={predictionData}
                dataPrepFunc={combinedClassificationStatusGroupedPrepFunc}
                title={'Human-Centric Issues Grouped by Status'}
                showNonHci={showNonHci}
                groups={statuses}
                stacked={false}
              ></GroupedBar>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}

export default App;
