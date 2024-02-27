import { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import {
  ADDITIONAL_FIELDS,
  BULK_PREDICT_FUNCTION_KEY,
  FIELDS_FOR_CLASSIFIER,
} from './constants';
import {
  getAllIssues,
  getAllPriorities,
  getAllStatuses,
} from './utils/requestJiraUtils';
import { constructBulkPayload } from './utils/misc';
import VerticalBar from './components/VerticalBar';
import GroupedBar from './components/groupedBar';
import {
  combinedClassificationPrepFunc,
  combinedClassificationPriorityGroupedPrepFunc,
  descriptionClassificationPrepFunc,
  summaryClassificationPrepFunc,
} from './utils/dataPrepFunctions';
import Checkbox from '@mui/material/Checkbox';

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
    getAllIssues(FIELDS_FOR_CLASSIFIER.concat(ADDITIONAL_FIELDS)).then(
      (issueData) => {
        issueData.forEach((item, index) => {
          item.id = index;
        });
        invoke(BULK_PREDICT_FUNCTION_KEY, constructBulkPayload(issueData)).then(
          (returnedData) => {
            returnedData.forEach((item, index) => {
              // recover fields which were not sent to classifier
              // assumes the structure of additional fields - subject to break
              ADDITIONAL_FIELDS.forEach((field) => {
                item[field] = issueData[index].fields[field].name;
              });
            });
            setPredictionData(returnedData);
          }
        );
      }
    );
  }, []);

  const [showNonHci, setShowNonHci] = useState(false);

  const handleSetShowNonHci = (event) => {
    setShowNonHci(event.target.checked);
  };

  return (
    <>
      <Checkbox checked={showNonHci} onChange={handleSetShowNonHci}></Checkbox>
      {predictionData ? (
        <>
          <VerticalBar
            data={predictionData}
            dataPrepFunc={combinedClassificationPrepFunc}
            title={'Overall Issue Classification'}
            showNonHci={showNonHci}
          ></VerticalBar>
          <VerticalBar
            data={predictionData}
            dataPrepFunc={summaryClassificationPrepFunc}
            title={'Issue Summary Classification'}
            showNonHci={showNonHci}
          ></VerticalBar>
          <VerticalBar
            data={predictionData}
            dataPrepFunc={descriptionClassificationPrepFunc}
            title={'Issue Description Classification'}
            showNonHci={showNonHci}
          ></VerticalBar>
        </>
      ) : (
        <div>Loading...</div>
      )}
      {predictionData && priorities ? (
        <GroupedBar
          data={predictionData}
          dataPrepFunc={combinedClassificationPriorityGroupedPrepFunc}
          title={'HCIs Grouped by Priority'}
          showNonHci={showNonHci}
          groups={priorities}
        ></GroupedBar>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default App;
