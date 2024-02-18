import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, useProductContext } from '@forge/react';
import { getIssueFields } from '../utils/requestJiraUtils';
import { invoke } from '@forge/bridge';
import { predictFunctionKey } from '../resolvers';
import { constructPayload } from '../utils/misc';

const App = () => {
  const context = useProductContext();
  const [comments, setComments] = useState();
  const [description, setDescription] = useState();
  const [summary, setSummary] = useState();

  useEffect(() => {
    if (context) {
      const issueId = context.extension.issue.id;
      getIssueFields(issueId, ['description, comment, summary']).then(
        (data) => {
          setComments(data.comment.comments);
          setDescription(data.description.content[0].content[0].text);
          setSummary(data.summary);
        }
      );
    }
  }, [context]);

  useEffect(() => {
    if (
      comments !== undefined &&
      description !== undefined &&
      summary !== undefined
    ) {
      invoke(
        predictFunctionKey,
        constructPayload(comments, summary, description)
      ).then((returnedData) => console.log(returnedData));
    }
  }, [comments, description, summary]);

  return (
    <>
      <Text>
        Number of comments on this issue:
        {comments ? comments.length : 'unknown'}
      </Text>
      <Text>Description: {description || 'unknown'}</Text>
      <Text>Summary: {summary || 'unknown'}</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
