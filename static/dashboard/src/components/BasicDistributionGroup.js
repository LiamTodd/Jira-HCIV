import React, { useState } from 'react';
import {
  combinedClassificationPrepFunc,
  descriptionClassificationPrepFunc,
  summaryClassificationPrepFunc,
} from '../utils/dataPrepFunctions';
import VerticalBar from './VerticalBar';
import Pie from './pie';
import { DISTRIBUTION_TYPE_PIE, DISTRIBUTION_TYPE_BAR } from '../constants';
import { Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
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
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleSetChartType}
        >
          <ToggleButton value={DISTRIBUTION_TYPE_PIE}>
            <PieChartIcon />
          </ToggleButton>
          <ToggleButton value={DISTRIBUTION_TYPE_BAR}>
            <BarChartIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      {chartType === DISTRIBUTION_TYPE_BAR && (
        <>
          <Grid item xs={4}>
            <VerticalBar
              data={data}
              dataPrepFunc={combinedClassificationPrepFunc}
              title={'Overall Issue Classification'}
              showNonHci={showNonHci}
            ></VerticalBar>
          </Grid>
          <Grid item xs={4}>
            <VerticalBar
              data={data}
              dataPrepFunc={summaryClassificationPrepFunc}
              title={'Issue Summary Classification'}
              showNonHci={showNonHci}
            ></VerticalBar>
          </Grid>
          <Grid item xs={4}>
            <VerticalBar
              data={data}
              dataPrepFunc={descriptionClassificationPrepFunc}
              title={'Issue Description Classification'}
              showNonHci={showNonHci}
            ></VerticalBar>
          </Grid>
        </>
      )}
      {chartType === DISTRIBUTION_TYPE_PIE && (
        <>
          <Grid item xs={4}>
            <Pie
              data={data}
              dataPrepFunc={combinedClassificationPrepFunc}
              title={'Overall Issue Classification'}
              showNonHci={showNonHci}
            ></Pie>
          </Grid>
          <Grid item xs={4}>
            <Pie
              data={data}
              dataPrepFunc={summaryClassificationPrepFunc}
              title={'Issue Summary Classification'}
              showNonHci={showNonHci}
            ></Pie>
          </Grid>
          <Grid item xs={4}>
            <Pie
              data={data}
              dataPrepFunc={descriptionClassificationPrepFunc}
              title={'Issue Description Classification'}
              showNonHci={showNonHci}
            ></Pie>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default BasicDistributionGroup;
