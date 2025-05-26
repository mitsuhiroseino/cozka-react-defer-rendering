import { ReactNode } from 'react';
import { UseDeferUntilReadyOptions } from '../useDeferUntilReady';

export type UseDeferUntilResolvedOptions<
  P extends ReactNode = ReactNode,
  E extends ReactNode = ReactNode,
> = UseDeferUntilReadyOptions<P, E>;
