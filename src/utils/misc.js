export const constructPayload = (comments, summary, description) => {
  const payload = {};
  comments.forEach((comment, i) => {
    payload[`comment-${i}`] = comment.body.content[0].content[0].text;
  });
  payload.summary = summary;
  payload.description = description;
  return payload;
};
