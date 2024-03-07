import { requestJira } from '@forge/bridge';

export const getJiraServerInfo = async () => {
  const response = await requestJira(`/rest/api/3/serverInfo`, {
    headers: {
      Accept: 'application/json',
    },
  });
  return await response.json();
};

const genericJiraGet = async (endpoint) => {
  const response = await requestJira(endpoint, {
    headers: {
      Accept: 'application/json',
    },
  });
  return await response.json();
};

export const getAllPriorities = async () => {
  return await genericJiraGet(`/rest/api/3/priority`);
};
export const getAllStatuses = async () => {
  return await genericJiraGet(`/rest/api/3/status`);
};

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
