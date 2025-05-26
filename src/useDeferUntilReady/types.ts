import { ReactNode } from 'react';
import { DeferRenderingWithErrorOptionsBase } from '../types';

export type UseDeferUntilReadyOptions<
  P extends ReactNode = ReactNode,
  E extends ReactNode = ReactNode,
> = DeferRenderingWithErrorOptionsBase<P, E>;
