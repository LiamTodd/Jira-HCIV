import {
  APP_USAGE,
  INCLUSIVENESS,
  NON_HUMAN_CENTRIC,
  USER_REACTION,
} from '../constants';

const combineClassifications = (class1, class2) => {
  const res = {};
  res[APP_USAGE] = class1[APP_USAGE] || class2[APP_USAGE];
  res[INCLUSIVENESS] = class1[INCLUSIVENESS] || class2[INCLUSIVENESS];
  res[USER_REACTION] = class1[USER_REACTION] || class2[USER_REACTION];
  res[NON_HUMAN_CENTRIC] =
    class1[NON_HUMAN_CENTRIC] && class2[NON_HUMAN_CENTRIC];
  return res;
};

const getNewClassificationCount = () => {
  const classificationCount = {};
  classificationCount[APP_USAGE] = 0;
  classificationCount[INCLUSIVENESS] = 0;
  classificationCount[USER_REACTION] = 0;
  classificationCount[NON_HUMAN_CENTRIC] = 0;
  return classificationCount;
};

export const combinedClassificationPrepFunc = (data) => {
  const classificationCount = getNewClassificationCount();
  data.forEach((issue) => {
    const classification = combineClassifications(
      issue.summary.predictions,
      issue.description.predictions
    );
    for (const [key, value] of Object.entries(classification)) {
      if (value) {
        classificationCount[key]++;
      }
    }
  });
  return {
    labels: Object.keys(classificationCount),
    datasets: [{ data: Object.values(classificationCount) }],
  };
};

export const summaryClassificationPrepFunc = (data) => {
  const classificationCount = getNewClassificationCount();
  data.forEach((issue) => {
    for (const [key, value] of Object.entries(issue.summary.predictions)) {
      if (value) {
        classificationCount[key]++;
      }
    }
  });
  return {
    labels: Object.keys(classificationCount),
    datasets: [{ data: Object.values(classificationCount) }],
  };
};

export const descriptionClassificationPrepFunc = (data) => {
  const classificationCount = getNewClassificationCount();
  data.forEach((issue) => {
    for (const [key, value] of Object.entries(issue.description.predictions)) {
      if (value) {
        classificationCount[key]++;
      }
    }
  });
  return {
    labels: Object.keys(classificationCount),
    datasets: [{ data: Object.values(classificationCount) }],
  };
};
