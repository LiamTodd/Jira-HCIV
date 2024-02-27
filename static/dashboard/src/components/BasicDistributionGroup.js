import React, { useState } from 'react';
import {
  combinedClassificationPrepFunc,
  descriptionClassificationPrepFunc,
  summaryClassificationPrepFunc,
} from '../utils/dataPrepFunctions';
import VerticalBar from './VerticalBar';
import Pie from './pie';
import { DISTRIBUTION_TYPE_PIE, DISTRIBUTION_TYPE_BAR } from '../constants';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';

function BasicDistributionGroup({ data, showNonHci }) {
  const [chartType, setChartType] = useState(DISTRIBUTION_TYPE_PIE);

  const handleSetChartType = (event, newType) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  return (
    <>
      <ToggleButtonGroup
        value={chartType}
        exclusive
        onChange={handleSetChartType}
      >
        <ToggleButton value={DISTRIBUTION_TYPE_BAR}>
          <BarChartIcon />
        </ToggleButton>
        <ToggleButton value={DISTRIBUTION_TYPE_PIE}>
          <PieChartIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <>
        {chartType === DISTRIBUTION_TYPE_BAR && (
          <>
            <VerticalBar
              data={data}
              dataPrepFunc={combinedClassificationPrepFunc}
              title={'Overall Issue Classification'}
              showNonHci={showNonHci}
            ></VerticalBar>
            <VerticalBar
              data={data}
              dataPrepFunc={summaryClassificationPrepFunc}
              title={'Issue Summary Classification'}
              showNonHci={showNonHci}
            ></VerticalBar>
            <VerticalBar
              data={data}
              dataPrepFunc={descriptionClassificationPrepFunc}
              title={'Issue Description Classification'}
              showNonHci={showNonHci}
            ></VerticalBar>
          </>
        )}
        {chartType === DISTRIBUTION_TYPE_PIE && (
          <>
            <Pie
              data={data}
              dataPrepFunc={combinedClassificationPrepFunc}
              title={'Overall Issue Classification'}
              showNonHci={showNonHci}
            ></Pie>
            <Pie
              data={data}
              dataPrepFunc={summaryClassificationPrepFunc}
              title={'Issue Summary Classification'}
              showNonHci={showNonHci}
            ></Pie>
            <Pie
              data={data}
              dataPrepFunc={descriptionClassificationPrepFunc}
              title={'Issue Description Classification'}
              showNonHci={showNonHci}
            ></Pie>
          </>
        )}
      </>
    </>
  );
}

export default BasicDistributionGroup;
