import { requestJira } from '@forge/bridge';

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
