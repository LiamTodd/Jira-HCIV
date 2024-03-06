export const constructPayload = (comments, summary, description) => {
  const payload = {};
  comments.forEach((comment, i) => {
    payload[`comment-${i}`] = comment.body.content[0].content[0].text;
  });
  payload.summary = summary;
  payload.description = description;
  return payload;
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
