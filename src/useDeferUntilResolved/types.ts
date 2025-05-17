import { ReactNode } from 'react';
import { useDeferUntilReadyOptions } from '../useDeferUntilReady';

export type UseDeferUntilResolvedOptions<
  P extends ReactNode = ReactNode,
  E extends ReactNode = ReactNode,
> = useDeferUntilReadyOptions<P, E>;
