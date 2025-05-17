import { ReactNode } from 'react';
import { DeferRenderingOptionsBase } from '../types';

export type UseDeferUntilTrueOptions<P extends ReactNode = ReactNode> =
  DeferRenderingOptionsBase<P>;
