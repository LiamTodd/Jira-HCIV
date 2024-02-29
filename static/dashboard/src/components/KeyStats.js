import React, { useEffect, useState } from 'react';
import {
  hciPriorityProportion,
  hciPriorityProportionByCategory,
  hciStatusProportion,
  hciStatusProportionByCategory,
  proportionHci,
  proportionHciByCategory,
  topHciAssignees,
  topHciAssigneesByCategory,
  topHciReporters,
  topHciReportersByCategory,
} from '../utils/keyStatsUtils';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { getMaxCount } from '../utils/misc';

function KeyStats({ data, statuses, priorities }) {
  const [proportion, setProportion] = useState();
  const [proportionCategorised, setProportionCategorised] = useState();
  const [assignees, setAssignees] = useState();
  const [assigneesCategorised, setAssigneesCategorised] = useState();
  const [reporters, setReporters] = useState();
  const [reportersCategorised, setReportersCategorised] = useState();
  const [statusData, setStatusData] = useState();
  const [statusDataCategorised, setStatusDataCategorised] = useState();
  const [priorityData, setPriorityData] = useState();
  const [priorityDataCategorised, setPriorityDataCategorised] = useState();

  useEffect(() => {
    setProportion(proportionHci(data));
    setProportionCategorised(proportionHciByCategory(data));
    setAssignees(topHciAssignees(data));
    setAssigneesCategorised(topHciAssigneesByCategory(data));
    setReporters(topHciReporters(data));
    setReportersCategorised(topHciReportersByCategory(data));
  }, [data]);

  useEffect(() => {
    setStatusData(hciStatusProportion(data, statuses));
    setStatusDataCategorised(hciStatusProportionByCategory(data, statuses));
  }, [data, statuses]);
  useEffect(() => {
    setPriorityData(hciPriorityProportion(data, priorities));
    setPriorityDataCategorised(
      hciPriorityProportionByCategory(data, priorities)
    );
  }, [data, priorities]);

  return (
    <Grid container xs={12} spacing={1}>
      <Grid item xs={4}>
        <Card
          variant='outlined'
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent>
            {proportion && (
              <>
                <Typography variant='h3'>{Math.round(proportion)}%</Typography>
                <Typography variant='caption'>
                  of issues are{' '}
                  <Typography variant='body1' display='inline'>
                    human-centric
                  </Typography>
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card
          variant='outlined'
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent>
            {assignees && (
              <>
                <Typography variant='h3'>
                  {Object.entries(assignees).reduce(getMaxCount)[0]}
                </Typography>
                <Typography variant='caption'>
                  is assigned to{' '}
                  <Typography variant='body1' display='inline'>
                    {Object.entries(assignees).reduce(getMaxCount)[1]}
                  </Typography>{' '}
                  human-centric issue
                  {Object.entries(assignees).reduce(getMaxCount)[1] !== 1 &&
                    's'}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card
          variant='outlined'
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent>
            {reporters && (
              <>
                <Typography variant='h3'>
                  {Object.entries(reporters).reduce(getMaxCount)[0]}
                </Typography>
                <Typography variant='caption'>
                  has reported{' '}
                  <Typography variant='body1' display='inline'>
                    {Object.entries(reporters).reduce(getMaxCount)[1]}
                  </Typography>{' '}
                  human-centric issue
                  {Object.entries(reporters).reduce(getMaxCount)[1] !== 1 &&
                    's'}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card
          variant='outlined'
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent>
            {priorityData && (
              <>
                <Typography variant='h3'>
                  {Object.entries(priorityData).reduce(getMaxCount)[1]}
                </Typography>
                <Typography variant='caption'>
                  human-centric issues have{' '}
                  <Typography variant='body1' display='inline'>
                    {Object.entries(priorityData).reduce(getMaxCount)[0]}
                  </Typography>{' '}
                  priority
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card
          variant='outlined'
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent>
            {statusData && (
              <>
                <Typography variant='h3'>
                  {Object.entries(statusData).reduce(getMaxCount)[1]}
                </Typography>
                <Typography variant='caption'>
                  human-centric issues have{' '}
                  <Typography variant='body1' display='inline'>
                    {Object.entries(statusData).reduce(getMaxCount)[0]}
                  </Typography>{' '}
                  status
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default KeyStats;
