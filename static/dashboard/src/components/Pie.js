import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie as PieCJS } from 'react-chartjs-2';
import { injectThemeColours } from '../utils/dataPrepFunctions';

ChartJS.register(ArcElement, Tooltip, Legend);

function Pie({ data, dataPrepFunc, showNonHci, title = 'Pie Chart' }) {
  return (
    <PieCJS
      data={injectThemeColours(dataPrepFunc(data, showNonHci))}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        title: {
          display: true,
          text: title,
        },
      }}
    ></PieCJS>
  );
}

export default Pie;
