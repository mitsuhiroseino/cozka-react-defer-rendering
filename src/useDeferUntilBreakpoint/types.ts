import { DeferRenderingOptionsBase } from '../types';

export type UseDeferUntilBreakpointOptions = DeferRenderingOptionsBase & {
  /**
   * スクロールイベントのデバウンス時間（ミリ秒）
   * デフォルトは100ms
   * @default 100
   */
  detectionDelay?: number;
};
