import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

export const predictFunctionKey = 'predict';

const resolver = new Resolver();
const urlBase =
  'https://7ee3-2001-8003-401a-c800-393c-97e9-7b99-b767.ngrok-free.app';

resolver.define(predictFunctionKey, async ({ payload, context }) => {
  const response = await fetch(`${urlBase}/classify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const responseData = await response.json();
  return responseData;
});

export const handler = resolver.getDefinitions();
