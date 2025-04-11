import { useDeferUntilReadyOptions } from '../useDeferUntilReady';

export type UseDeferUntilTrueOptions = Omit<
  useDeferUntilReadyOptions,
  'error' | 'errorDefer' | 'preserveOnceError'
>;
