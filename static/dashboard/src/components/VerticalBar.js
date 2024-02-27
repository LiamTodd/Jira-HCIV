import React from 'react';
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
import { injectThemeColours } from '../utils/dataPrepFunctions';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function VerticalBar({
  data,
  dataPrepFunc,
  showNonHci,
  title = 'Vertical Bar Chart',
}) {
  return (
    <Bar
      data={injectThemeColours(dataPrepFunc(data, showNonHci))}
      options={{
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: title,
          },
        },
      }}
    ></Bar>
  );
}

export default VerticalBar;
