import React from 'react';
import { proportionHci, proportionHciByCategory } from '../utils/keyStatsUtils';

function KeyStats({ data }) {
  console.log(proportionHci(data));
  console.log(proportionHciByCategory(data));
  return <div>KeyStats</div>;
}

export default KeyStats;
