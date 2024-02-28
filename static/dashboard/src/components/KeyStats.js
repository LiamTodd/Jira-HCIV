import React from 'react';
import {
  proportionHci,
  proportionHciByCategory,
  topHciAssignees,
  topHciAssigneesByCategory,
  topHciReporters,
  topHciReportersByCategory,
} from '../utils/keyStatsUtils';

function KeyStats({ data }) {
  console.log(proportionHci(data));
  console.log(proportionHciByCategory(data));
  console.log(topHciAssignees(data));
  console.log(topHciAssigneesByCategory(data));
  console.log(topHciReporters(data));
  console.log(topHciReportersByCategory(data));
  return <div>KeyStats</div>;
}

export default KeyStats;
