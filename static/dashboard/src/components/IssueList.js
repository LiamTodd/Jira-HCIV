import React, { useEffect, useState } from 'react';
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  IconButton,
  Box,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { generateCategoryChips } from '../utils/uiUtils';
import { combineClassifications } from '../utils/misc';
import { NON_HUMAN_CENTRIC } from '../constants';

function IssueList({ data, showNonHci }) {
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (showNonHci === true) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((issue) => {
          const classification = combineClassifications(
            issue.summary.predictions,
            issue.description.predictions
          );
          return !classification[NON_HUMAN_CENTRIC];
        })
      );
    }
  }, [data, showNonHci]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1vw',
        marginBottom: '0.2vw',
      }}
    >
      <Box display='flex' flexDirection='row'>
        <Typography variant='h6'>Issues</Typography>
        <IconButton
          onClick={handleExpandClick}
          sx={{
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant='subtitle1'>Key</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle1'>Summary</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle1'>
                    Human-Centric Classification
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((issue) => (
                  <TableRow key={issue.key}>
                    <TableCell>
                      <Typography variant='caption'>{issue.key}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        {issue.summary.content}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {generateCategoryChips(
                        combineClassifications(
                          issue.summary.predictions,
                          issue.description.predictions
                        )
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component='div'
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          slotProps={{
            select: {
              inputProps: {
                'aria-label': 'rows per page',
              },
            },
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Collapse>
    </Card>
  );
}

export default IssueList;
