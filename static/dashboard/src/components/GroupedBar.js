import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const STACKED_OPTION = {
  x: {
    stacked: true,
  },
  y: {
    stacked: true,
  },
};

function GroupedBar({
  data,
  showNonHci,
  title = 'Grouped Vertical Bar',
  dataPrepFunc,
  groups,
  stacked,
}) {
  const [options, setOptions] = useState(() => {
    if (stacked) {
      return {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: STACKED_OPTION,
      };
    } else {
      return {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
      };
    }
  });

  const handleSetIsStacked = (event, newIsStacked) => {
    if (newIsStacked !== null) {
      const newOptions = { ...options };
      setIsStacked(newIsStacked);
      if (newIsStacked) {
        newOptions.scales = STACKED_OPTION;
      } else {
        newOptions.scales = null;
      }
      setOptions(newOptions);
    }
  };
  const [isStacked, setIsStacked] = useState(stacked);

  return (
    <>
      <ToggleButtonGroup
        exclusive
        onChange={handleSetIsStacked}
        value={isStacked}
      >
        <ToggleButton value={true}>
          <StackedBarChartIcon />
        </ToggleButton>
        <ToggleButton value={false}>
          <BarChartIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography>{title}</Typography>
      <Bar
        data={dataPrepFunc(data, showNonHci, groups)}
        options={options}
      ></Bar>
    </>
  );
}

export default GroupedBar;
