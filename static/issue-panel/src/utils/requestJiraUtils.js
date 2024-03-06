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
