import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie as PieCJS } from 'react-chartjs-2';
import { injectThemeColours } from '../utils/dataPrepFunctions';
import { Card, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

function Pie({ data, dataPrepFunc, showNonHci, title = 'Pie Chart' }) {
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
      <PieCJS
        data={injectThemeColours(dataPrepFunc(data, showNonHci))}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        }}
      ></PieCJS>
    </Card>
  );
}

export default Pie;
