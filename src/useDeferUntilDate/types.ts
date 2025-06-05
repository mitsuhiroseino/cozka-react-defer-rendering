import { ReactNode } from 'react';
import { UseDeferUntilTimeoutOptions } from '../useDeferUntilTimeout';

export type UseDeferUntilDateOptions<P extends ReactNode = ReactNode> =
  UseDeferUntilTimeoutOptions<P>;
