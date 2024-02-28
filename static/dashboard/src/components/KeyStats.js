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

  return <div>KeyStats</div>;
}

export default KeyStats;
