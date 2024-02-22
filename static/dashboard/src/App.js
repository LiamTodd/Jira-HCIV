import React, { useEffect } from 'react';
import { invoke } from '@forge/bridge';
import { BULK_PREDICT_FUNCTION_KEY } from './constants';
import { getAllIssues } from './utils/requestJiraUtils';
import { constructBulkPayload } from './utils/misc';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * (0 - 100))),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * (0 - 100))),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function App() {
  useEffect(() => {
    getAllIssues(['summary', 'description', 'comment']).then((issueData) => {
      invoke(BULK_PREDICT_FUNCTION_KEY, constructBulkPayload(issueData)).then(
        (returnedData) => console.log(returnedData)
      );
    });
  }, []);

  return <Bar options={options} data={data} />;
}

export default App;
