import { invoke, view } from '@forge/bridge';
import { useEffect, useState } from 'react';
import { getIssueFields } from './utils/requestJiraUtils';
import { PREDICT_FUNCTION_KEY } from './constants';
import { constructPayload } from './utils/misc';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Box,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import {
  generateCommentChips,
  generateCategoryChips,
  generateCommentRows,
} from './utils/uiUtils';

function App() {
  const [issueId, setIssueId] = useState();
  const [comments, setComments] = useState();
  const [description, setDescription] = useState();
  const [summary, setSummary] = useState();
  const [processedData, setProcessedData] = useState();

  useEffect(() => {
    view.getContext().then((context) => {
      setIssueId(context.extension.issue.id);
    });
  }, []);

  useEffect(() => {
    if (issueId !== null) {
      getIssueFields(issueId, ['description, comment, summary']).then(
        (data) => {
          setComments(data.comment.comments);
          setDescription(data.description.content[0].content[0].text);
          setSummary(data.summary);
        }
      );
    }
  }, [issueId]);

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
      ).then((returnedData) => {
        console.log(returnedData);
        setProcessedData(returnedData);
      });
    }
  }, [comments, description, summary]);

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableCell>
            <Typography>Source</Typography>
          </TableCell>
          <TableCell>
            <Typography>Human-centric issue category</Typography>
          </TableCell>
        </TableHead>
        <TableBody>
          {processedData && (
            <>
              <TableRow>
                <TableCell>Summary</TableCell>
                <TableCell>
                  {generateCategoryChips(processedData.summary.predictions)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>
                  {generateCategoryChips(processedData.description.predictions)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    Comments (combined)
                    <CardActions>
                      <IconButton
                        onClick={handleExpandClick}
                        sx={{
                          transform: expanded
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                          transition: 'transform 0.3s',
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                  </Box>
                </TableCell>
                <TableCell>{generateCommentChips(processedData)}</TableCell>
              </TableRow>
              {expanded && generateCommentRows(processedData)}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
