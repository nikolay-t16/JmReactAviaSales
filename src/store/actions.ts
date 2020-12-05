import { ACTION_CHECK } from './reducer';

// eslint-disable-next-line import/prefer-default-export
export const checkFn = (payload: string) => ({ type: ACTION_CHECK, payload });
