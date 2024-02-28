import { NON_HUMAN_CENTRIC } from '../constants';
import { combineClassifications, getNewClassificationCount } from './misc';

// how many of the total issues are hc
export const proportionHci = (issues) => {
  const humanCentricIssues = issues.filter((issue) => {
    const classification = combineClassifications(
      issue.summary.predictions,
      issue.description.predictions
    );
    return !classification[NON_HUMAN_CENTRIC];
  });
  return (humanCentricIssues.length / issues.length) * 100;
};

export const proportionHciByCategory = (issues) => {
  const result = getNewClassificationCount();
  issues.forEach((issue) => {
    const classification = combineClassifications(
      issue.summary.predictions,
      issue.description.predictions
    );
    for (const [key, value] of Object.entries(classification)) {
      if (value && result[key] !== undefined) {
        result[key]++;
      }
    }
  });
  const totalIssues = issues.length;
  for (const [key, value] of Object.entries(result)) {
    result[key] = (value / totalIssues) * 100;
  }
  return result;
};

const topHciUsers = (issues, userType) => {
  const result = {};
  issues.forEach((issue) => {
    const user = issue[userType];
    const classification = combineClassifications(
      issue.summary.predictions,
      issue.description.predictions
    );
    // if classification is NOT non human-centric and user is defined
    if (!classification[NON_HUMAN_CENTRIC] && user) {
      if (result[user]) {
        // record exists, increment count
        result[user]++;
      } else {
        // start new record
        result[user] = 1;
      }
    }
  });
  return result;
};

const topHciUsersByCategory = (issues, userType) => {
  const result = {};
  Object.keys(getNewClassificationCount()).forEach((category) => {
    result[category] = {};
    issues.forEach((issue) => {
      const user = issue[userType];
      const classification = combineClassifications(
        issue.summary.predictions,
        issue.description.predictions
      );
      if (classification[category] && user) {
        if (result[category][user]) {
          result[category][user]++;
        } else {
          result[category][user] = 1;
        }
      }
    });
  });
  return result;
};

// which users are working on hcis
export const topHciAssignees = (issues) => {
  return topHciUsers(issues, 'assignee');
};
export const topHciAssigneesByCategory = (issues) => {
  return topHciUsersByCategory(issues, 'assignee');
};

// which users are reporting hcis
export const topHciReporters = (issues) => {
  return topHciUsers(issues, 'reporter');
};
export const topHciReportersByCategory = (issues) => {
  return topHciUsersByCategory(issues, 'reporter');
};

// how is progress on hcis
export const hciStatusProportion = (data) => {};
export const hciStatusProportionByCategory = (data) => {};

// how are hcis being prioritised
export const hciPriorityProportion = (data) => {};
export const hciPriorityProportionByCategory = (data) => {};

// how old are hcis comparatively
export const averageIssueage = (data) => {};
export const averageHciIssueage = (data) => {};
