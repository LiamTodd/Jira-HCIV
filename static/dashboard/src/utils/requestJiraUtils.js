import { requestJira } from '@forge/bridge';

export const getAllIssues = async (fields = [], maxResults = 100) => {
  let allIssues = [];
  let startAt = 0;
  let totalIssues = maxResults; // Initialize totalIssues to maxResults to enter the loop

  // Continue fetching issues until all issues are retrieved
  while (startAt < totalIssues) {
    const res = await requestJira(
      `/rest/api/3/search?startAt=${startAt}&maxResults=${Math.min(
        100,
        maxResults
      )}&fields=${fields.join(',')}`
    );
    const data = await res.json();
    allIssues = allIssues.concat(data.issues);
    startAt += data.issues.length;
    totalIssues = data.total;
  }

  return allIssues;
};
