import { NON_HUMAN_CENTRIC } from '../constants';
import {
  combineClassifications,
  getNewClassificationCount,
  getNewGroupCount,
} from './misc';

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

const hciGenericFieldProportion = (issues, groups, field) => {
  const result = getNewGroupCount(groups);
  issues
    .filter((issue) => {
      const classification = combineClassifications(
        issue.description.predictions,
        issue.summary.predictions
      );
      return !classification[NON_HUMAN_CENTRIC];
    })
    .forEach((issue) => {
      result[issue[field]]++;
    });
  return result;
};

const hciGenericFieldProportionByCategory = (issues, groups, field) => {
  const result = {};
  Object.keys(getNewClassificationCount()).forEach((category) => {
    result[category] = getNewGroupCount(groups);
    issues
      .filter((issue) => {
        const classification = combineClassifications(
          issue.description.predictions,
          issue.summary.predictions
        );
        return classification[category];
      })
      .forEach((issue) => {
        result[category][issue[field]]++;
      });
  });
  return result;
};
// how is progress on hcis
export const hciStatusProportion = (issues, statuses) => {
  return hciGenericFieldProportion(issues, statuses, 'status');
};
export const hciStatusProportionByCategory = (issues, statuses) => {
  return hciGenericFieldProportionByCategory(issues, statuses, 'status');
};

// how are hcis being prioritised
export const hciPriorityProportion = (issues, priorities) => {
  return hciGenericFieldProportion(issues, priorities, 'priority');
};
export const hciPriorityProportionByCategory = (issues, priorities) => {
  return hciGenericFieldProportionByCategory(issues, priorities, 'priority');
};

// how old are hcis comparatively
export const averageIssueAge = (issues) => {};
export const averageHciIssueAge = (issues) => {};
