import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

export const predictFunctionKey = 'predict';
export const bulkPredictFunctionKey = 'bulk-predict';

const genericClassifierCaller = async (payload, endpoint) => {
  const response = await fetch(`${urlBase}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const responseData = await response.json();
  return responseData;
};

const resolver = new Resolver();
const urlBase =
  'https://9451-2001-8003-401a-c800-25d1-590c-8dd-4f26.ngrok-free.app';

resolver.define(predictFunctionKey, async ({ payload, context }) => {
  return await genericClassifierCaller(payload, 'classify');
});

resolver.define(bulkPredictFunctionKey, async ({ payload, context }) => {
  return await genericClassifierCaller(payload, 'bulk-classify');
});

export const handler = resolver.getDefinitions();
