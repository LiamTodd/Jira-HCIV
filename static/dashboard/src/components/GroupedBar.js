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
import { Checkbox, Typography } from '@mui/material';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function GroupedBar({
  data,
  showNonHci,
  title = 'Grouped Vertical Bar',
  dataPrepFunc,
  groups,
}) {
  const [options, setOptions] = useState({
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
  });

  const handleSetStacked = (event) => {
    const newOptions = { ...options };
    if (event.target.checked) {
      newOptions.scales = {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      };
    } else {
      newOptions.scales = null;
    }
    setOptions(newOptions);
  };
  return (
    <>
      <Checkbox onChange={handleSetStacked}></Checkbox>
      <Typography>{title}</Typography>
      <Bar
        data={dataPrepFunc(data, showNonHci, groups)}
        options={options}
      ></Bar>
    </>
  );
}

export default GroupedBar;
