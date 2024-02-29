import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { injectThemeColours } from '../utils/dataPrepFunctions';
import { Card, Typography } from '@mui/material';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function VerticalBar({
  data,
  dataPrepFunc,
  showNonHci,
  title = 'Vertical Bar Chart',
}) {
  return (
    <Card
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1vw',
      }}
    >
      <Typography>{title}</Typography>
      <Bar
        data={injectThemeColours(dataPrepFunc(data, showNonHci))}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      ></Bar>
    </Card>
  );
}

export default VerticalBar;
