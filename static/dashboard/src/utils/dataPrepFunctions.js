import {
  APP_USAGE,
  INCLUSIVENESS,
  NON_HUMAN_CENTRIC,
  USER_REACTION,
} from '../constants';
import { cleanLabel } from './stringUtils';

const combineClassifications = (class1, class2) => {
  const res = {};
  res[APP_USAGE] = class1[APP_USAGE] || class2[APP_USAGE];
  res[INCLUSIVENESS] = class1[INCLUSIVENESS] || class2[INCLUSIVENESS];
  res[USER_REACTION] = class1[USER_REACTION] || class2[USER_REACTION];
  res[NON_HUMAN_CENTRIC] =
    class1[NON_HUMAN_CENTRIC] && class2[NON_HUMAN_CENTRIC];
  return res;
};

const getNewClassificationCount = (showNonHci) => {
  const classificationCount = {};
  classificationCount[APP_USAGE] = 0;
  classificationCount[INCLUSIVENESS] = 0;
  classificationCount[USER_REACTION] = 0;
  if (showNonHci) classificationCount[NON_HUMAN_CENTRIC] = 0;
  return classificationCount;
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
  const labels = Object.keys(getNewClassificationCount(showNonHci)).map(
    (label) => cleanLabel(label)
  );
  priorities.forEach((priority) => {
    const dataSet = {
      label: priority.name,
      backgroundColor: priority.statusColor,
    };
    const classificationCount = getNewClassificationCount(showNonHci);
    data
      .filter((issue) => issue.priority === priority.name)
      .forEach((issue) => {
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
    dataSet.data = Object.values(classificationCount);
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
  const labels = Object.keys(getNewClassificationCount(showNonHci)).map(
    (label) => cleanLabel(label)
  );
  statuses.forEach((status) => {
    const dataSet = {
      label: status.name,
      backgroundColor: status.statusCategory.colorName,
    };
    const classificationCount = getNewClassificationCount(showNonHci);
    data
      .filter((issue) => issue.status === status.name)
      .forEach((issue) => {
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
    dataSet.data = Object.values(classificationCount);
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
