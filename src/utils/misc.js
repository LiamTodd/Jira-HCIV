export const constructPayload = (comments, summary, description) => {
  const payload = {};
  comments.forEach((comment, i) => {
    payload[`comment-${i}`] = comment.body.content[0].content[0].text;
  });
  payload.summary = summary;
  payload.description = description;
  return payload;
};

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
