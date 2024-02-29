import {
  APP_USAGE,
  INCLUSIVENESS,
  NON_HUMAN_CENTRIC,
  USER_REACTION,
} from '../constants';

export const constructBulkPayload = (issueData) => {
  return issueData.map((issue) => {
    const payload = {
      summary: issue.fields.summary,
      description: issue.fields.description.content[0].content[0].text,
    };

    for (let i = 0; i < issue.fields.comment.comments.length; i++) {
      payload[`comment-${i}`] =
        issue.fields.comment.comments[i].body.content[0].content[0].text;
    }

    return payload;
  });
};

export const combineClassifications = (class1, class2) => {
  const res = {};
  res[APP_USAGE] = class1[APP_USAGE] || class2[APP_USAGE];
  res[INCLUSIVENESS] = class1[INCLUSIVENESS] || class2[INCLUSIVENESS];
  res[USER_REACTION] = class1[USER_REACTION] || class2[USER_REACTION];
  res[NON_HUMAN_CENTRIC] =
    class1[NON_HUMAN_CENTRIC] && class2[NON_HUMAN_CENTRIC];
  return res;
};

export const getNewClassificationCount = (includeNonHci = true) => {
  const classificationCount = {};
  classificationCount[APP_USAGE] = 0;
  classificationCount[INCLUSIVENESS] = 0;
  classificationCount[USER_REACTION] = 0;
  if (includeNonHci) classificationCount[NON_HUMAN_CENTRIC] = 0;
  return classificationCount;
};

export const getNewGroupCount = (groups) => {
  const groupCount = {};
  groups.forEach((group) => {
    groupCount[group.name] = 0;
  });
  return groupCount;
};

export const getMaxCount = (e1, e2) => {
  if (e1[1] > e2[1]) {
    return e1;
  }
  return e2;
};
