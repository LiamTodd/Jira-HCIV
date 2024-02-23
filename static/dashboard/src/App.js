import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import { BULK_PREDICT_FUNCTION_KEY } from './constants';
import { getAllIssues } from './utils/requestJiraUtils';
import { constructBulkPayload } from './utils/misc';
import VerticalBar from './components/VerticalBar';
import {
  combinedClassificationPrepFunc,
  descriptionClassificationPrepFunc,
  summaryClassificationPrepFunc,
} from './utils/dataPrepFunctions';

function App() {
  const [predictionData, setPredictionData] = useState();
  useEffect(() => {
    getAllIssues(['summary', 'description', 'comment']).then((issueData) => {
      invoke(BULK_PREDICT_FUNCTION_KEY, constructBulkPayload(issueData)).then(
        (returnedData) => setPredictionData(returnedData)
      );
    });
  }, []);

  return (
    <>
      {predictionData ? (
        <>
          <VerticalBar
            data={predictionData}
            dataPrepFunc={combinedClassificationPrepFunc}
            title={'Overall Issue Classification'}
          ></VerticalBar>
          <VerticalBar
            data={predictionData}
            dataPrepFunc={summaryClassificationPrepFunc}
            title={'Issue Summary Classification'}
          ></VerticalBar>
          <VerticalBar
            data={predictionData}
            dataPrepFunc={descriptionClassificationPrepFunc}
            title={'Issue Description Classification'}
          ></VerticalBar>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default App;
