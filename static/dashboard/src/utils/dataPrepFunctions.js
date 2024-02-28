import { THEME_COLOURS_DICT } from '../constants';
import { combineClassifications, getNewClassificationCount } from './misc';
import { cleanLabel } from './stringUtils';

const getNewGroupCount = (groups) => {
  const groupCount = {};
  groups.forEach((group) => {
    groupCount[group.name] = 0;
  });
  return groupCount;
};
export const combinedClassificationPrepFunc = (data, showNonHci) => {
  const classificationCount = getNewClassificationCount(showNonHci);
  data.forEach((issue) => {
    const classification = combineClassifications(
      issue.summary.predictions,
      issue.description.predictions
    );
    for (const [key, value] of Object.entries(classification)) {
      if (value && classificationCount[key] !== undefined) {
        classificationCount[key]++;
      }
    }
  });
  return {
    labels: Object.keys(classificationCount).map((label) => cleanLabel(label)),
    datasets: [{ data: Object.values(classificationCount) }],
  };
};

export const combinedClassificationPriorityGroupedPrepFunc = (
  data,
  showNonHci,
  priorities
) => {
  const datasets = [];
  const labels = priorities.map((priority) => cleanLabel(priority.name));
  const HciCategories = Object.keys(getNewClassificationCount(showNonHci));
  HciCategories.forEach((category) => {
    const dataSet = {
      label: cleanLabel(category),
      backgroundColor: THEME_COLOURS_DICT[category],
    };
    const priorityCount = getNewGroupCount(priorities);
    data.forEach((issue) => {
      const classification = combineClassifications(
        issue.summary.predictions,
        issue.description.predictions
      );
      if (classification[category] && issue.priority !== undefined) {
        priorityCount[issue.priority]++;
      }
    });
    dataSet.data = Object.values(priorityCount);
    datasets.push(dataSet);
  });
  return {
    labels: labels,
    datasets: datasets,
  };
};

export const combinedClassificationStatusGroupedPrepFunc = (
  data,
  showNonHci,
  statuses
) => {
  const datasets = [];
  const labels = statuses.map((status) => cleanLabel(status.name));
  const HciCategories = Object.keys(getNewClassificationCount(showNonHci));
  HciCategories.forEach((category) => {
    const dataSet = {
      label: cleanLabel(category),
      backgroundColor: THEME_COLOURS_DICT[category],
    };
    const statusCount = getNewGroupCount(statuses);
    data.forEach((issue) => {
      const classification = combineClassifications(
        issue.summary.predictions,
        issue.description.predictions
      );
      if (classification[category] && issue.status !== undefined) {
        statusCount[issue.status]++;
      }
    });
    dataSet.data = Object.values(statusCount);
    datasets.push(dataSet);
  });
  return {
    labels: labels,
    datasets: datasets,
  };
};

export const summaryClassificationPrepFunc = (data, showNonHci) => {
  const classificationCount = getNewClassificationCount(showNonHci);
  data.forEach((issue) => {
    for (const [key, value] of Object.entries(issue.summary.predictions)) {
      if (value && classificationCount[key] !== undefined) {
        classificationCount[key]++;
      }
    }
  });
  return {
    labels: Object.keys(classificationCount).map((label) => cleanLabel(label)),
    datasets: [{ data: Object.values(classificationCount) }],
  };
};

export const descriptionClassificationPrepFunc = (data, showNonHci) => {
  const classificationCount = getNewClassificationCount(showNonHci);
  data.forEach((issue) => {
    for (const [key, value] of Object.entries(issue.description.predictions)) {
      if (value && classificationCount[key] !== undefined) {
        classificationCount[key]++;
      }
    }
  });
  return {
    labels: Object.keys(classificationCount).map((label) => cleanLabel(label)),
    datasets: [{ data: Object.values(classificationCount) }],
  };
};

export const injectThemeColours = (data) => {
  const newData = { ...data };
  newData.datasets.forEach((dataset) => {
    dataset.backgroundColor = Object.values(THEME_COLOURS_DICT);
  });
  return newData;
};
