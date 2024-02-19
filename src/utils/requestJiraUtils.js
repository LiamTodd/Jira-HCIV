import { requestJira } from '@forge/bridge';

// generic getter for issue details
// example: const data = getIssueFields(issueId, ['comment', 'description'])
export const getIssueFields = async (issueId, fields = []) => {
  const res = await requestJira(
    `/rest/api/3/issue/${issueId}?fields=${fields.join(',')}`
  );
  const data = await res.json();
  return data.fields;
};

export const getAllIssues = async (fields = [], maxResults = 100) => {
  const res = await requestJira(
    `/rest/api/3/search?maxResults=${Math.min(
      100,
      maxResults
    )}&fields=${fields.join(',')}`
  );
  const data = await res.json();
  // if totalIssues > maxResults, could implement pagination get-around (low priority)
  const totalIssues = res.total;
  return data.issues;
};
