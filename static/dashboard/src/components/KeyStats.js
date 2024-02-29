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
import { Grid } from '@mui/material';
import ProportionKeyStats from './ProportionKeyStats';
import UsersKeyStats from './UsersKeyStats';
import SimpleTextFieldStats from './SimpleTextFieldStats';

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
    <Grid container spacing={1}>
      <Grid item xs={4}>
        {proportion && proportionCategorised && (
          <ProportionKeyStats
            proportion={proportion}
            proportionCategorised={proportionCategorised}
          ></ProportionKeyStats>
        )}
      </Grid>

      <Grid item xs={4}>
        {assignees && assigneesCategorised && (
          <UsersKeyStats
            users={assignees}
            usersCategorised={assigneesCategorised}
            preText={'is assigned to'}
          ></UsersKeyStats>
        )}
      </Grid>
      <Grid item xs={4}>
        {reporters && reportersCategorised && (
          <UsersKeyStats
            users={reporters}
            usersCategorised={reportersCategorised}
            preText={'has reported'}
          ></UsersKeyStats>
        )}
      </Grid>

      <Grid item xs={4}>
        {priorityData && priorityDataCategorised && (
          <SimpleTextFieldStats
            data={priorityData}
            dataCategorised={priorityDataCategorised}
            postText={'priority'}
          ></SimpleTextFieldStats>
        )}
      </Grid>

      <Grid item xs={4}>
        {statusData && statusDataCategorised && (
          <SimpleTextFieldStats
            data={statusData}
            dataCategorised={statusDataCategorised}
            postText={'status'}
          ></SimpleTextFieldStats>
        )}
      </Grid>
    </Grid>
  );
}

export default KeyStats;
