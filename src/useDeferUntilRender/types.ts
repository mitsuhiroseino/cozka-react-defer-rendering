import { UseDeferUntilTrueOptions } from '../useDeferUntilTrue';

export type UseDeferUntilBreakpointOptions = UseDeferUntilTrueOptions & {
  /**
   * エレメントを監視する間隔（ミリ秒）
   * デフォルトは400ms
   * @default 400
   */
  interval?: number;
};
