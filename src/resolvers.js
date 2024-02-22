import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';
import {
  BULK_PREDICT_FUNCTION_KEY,
  PREDICT_FUNCTION_KEY,
  URL_BASE,
  CLASSIFY_ENDPOINT,
  BULK_CLASSIFY_ENDPOINT,
} from './constants';

const genericClassifierCaller = async (payload, endpoint) => {
  const response = await fetch(`${URL_BASE}/${endpoint}`, {
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

resolver.define(PREDICT_FUNCTION_KEY, async ({ payload }) => {
  return await genericClassifierCaller(payload, CLASSIFY_ENDPOINT);
});

resolver.define(BULK_PREDICT_FUNCTION_KEY, async ({ payload }) => {
  return await genericClassifierCaller(payload, BULK_CLASSIFY_ENDPOINT);
});

export const handler = resolver.getDefinitions();
