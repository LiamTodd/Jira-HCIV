import React, { useEffect } from 'react';
import ForgeReconciler, { Text } from '@forge/react';
import { getAllIssues } from '../utils/requestJiraUtils';
import { constructBulkPayload } from '../utils/misc';
import { bulkPredictFunctionKey } from '../resolvers';
import { invoke } from '@forge/bridge';

const App = () => {
  useEffect(() => {
    getAllIssues(['summary', 'description', 'comment']).then((issueData) => {
      invoke(bulkPredictFunctionKey, constructBulkPayload(issueData)).then(
        (returnedData) => console.log(returnedData)
      );
    });
  }, []);

  return (
    <>
      <Text>Hello world!</Text>
      <Text>This is the project page thing!</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
