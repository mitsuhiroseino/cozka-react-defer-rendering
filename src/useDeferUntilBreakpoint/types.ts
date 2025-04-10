import { UseDeferUntilTrueOptions } from '../useDeferUntilTrue';

export type UseDeferUntilBreakpointOptions = UseDeferUntilTrueOptions & {
  /**
   * スクロールイベントのデバウンス時間（ミリ秒）
   * デフォルトは100ms
   * @default 100
   */
  detectionDelay?: number;
};
