import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, useProductContext } from '@forge/react';
import { fetchIssueData } from '../utils/requestJiraUtils';
const App = () => {
  const context = useProductContext();

  useEffect(() => {
    if (context) {
      const issueId = context.extension.issue.id;
      fetchIssueData(issueId);
    }
  }, [context]);

  return (
    <>
      <Text>Hello world!</Text>
      <Text>This is the project page thing !</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
