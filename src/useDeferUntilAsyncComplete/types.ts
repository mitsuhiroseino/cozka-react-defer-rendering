import { ReactNode } from 'react';
import { UseDeferUntilResolvedOptions } from '../useDeferUntilResolved';

export type UseDeferUntilAsyncCompleteOptions<
  P extends ReactNode = ReactNode,
  E extends ReactNode = ReactNode,
> = UseDeferUntilResolvedOptions<P, E>;
