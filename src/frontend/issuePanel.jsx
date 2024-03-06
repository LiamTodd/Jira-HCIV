import React, { useEffect, useState } from 'react';
import { getIssueFields } from '../utils/requestJiraUtils';
import { invoke } from '@forge/bridge';
import { constructPayload } from '../utils/utils';
import { PREDICT_FUNCTION_KEY } from '../constants';
import ForgeReconciler, { useProductContext } from '@forge/react';
import ForgeUI, {
  render,
  Cell,
  Head,
  Row,
  Table,
  Tag,
  TagGroup,
  Text,
} from '@forge/ui';

const IssuePanel = () => {
  const context = useProductContext();
  const [comments, setComments] = useState();
  const [description, setDescription] = useState();
  const [summary, setSummary] = useState();
  const [processedData, setProcessedData] = useState();

  useEffect(() => {
    // retreive issues from jira backend
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
    // retrieve predictions from ML backend
    if (
      comments !== undefined &&
      description !== undefined &&
      summary !== undefined
    ) {
      invoke(
        PREDICT_FUNCTION_KEY,
        constructPayload(comments, summary, description)
      ).then((returnedData) => setProcessedData(returnedData));
    }
  }, [comments, description, summary]);

  return (
    <Table>
      <Head>
        <Cell>
          <Text>Source</Text>
        </Cell>
        <Cell>
          <Text>Human-centric issue category</Text>
        </Cell>
      </Head>
      {processedData && (
        <Row>
          <Cell>Summary</Cell>
          <Cell>
            <TagGroup>
              {Object.keys(processedData.summary.predictions).map(
                (category) => {
                  if (processedData.summary.predictions[category]) {
                    return <Tag color='blue'>{category}</Tag>; // todo: make a colour dict {category: color} to set colour
                  }
                }
              )}
            </TagGroup>
          </Cell>
        </Row>
      )}

      {description && (
        <Row>
          <Cell>Description</Cell>
          <Cell>-</Cell>
        </Row>
      )}

      {comments && (
        <Row>
          <Cell>Comments (combined)</Cell>
          <Cell>-</Cell>
        </Row>
      )}
    </Table>
  );
};

render(<IssuePanel />);
