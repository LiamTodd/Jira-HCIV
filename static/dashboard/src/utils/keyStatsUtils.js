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

// which users are working on hcis
export const topHciAssignees = (data) => {};
export const topHciAssigneesByCategory = (data) => {};

// which users are reporting hcis
export const topHciReporters = (data) => {};
export const topHciReportersByCategory = (data) => {};

// how is progress on hcis
export const hciStatusProportion = (data) => {};
export const hciStatusProportionByCategory = (data) => {};

// how are hcis being prioritised
export const hciPriorityProportion = (data) => {};
export const hciPriorityProportionByCategory = (data) => {};

// how old are hcis comparatively
export const averageIssueage = (data) => {};
export const averageHciIssueage = (data) => {};
