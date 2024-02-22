import React, { useEffect } from 'react';
import { invoke } from '@forge/bridge';
import { BULK_PREDICT_FUNCTION_KEY } from './constants';
import { getAllIssues } from './utils/requestJiraUtils';
import { constructBulkPayload } from './utils/misc';

function App() {
  useEffect(() => {
    getAllIssues(['summary', 'description', 'comment']).then((issueData) => {
      invoke(BULK_PREDICT_FUNCTION_KEY, constructBulkPayload(issueData)).then(
        (returnedData) => console.log(returnedData)
      );
    });
  }, []);

  return <div>Hello from custom UI</div>;
}

export default App;
