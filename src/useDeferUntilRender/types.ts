import { ReactNode } from 'react';
import { UseDeferUntilTrueOptions } from '../useDeferUntilTrue';

export type UseDeferUntilBreakpointOptions<P extends ReactNode = ReactNode> =
  UseDeferUntilTrueOptions<P> & {
    /**
     * エレメントを監視する間隔（ミリ秒）
     * デフォルトは400ms
     * @default 400
     */
    interval?: number;
  };
