import { UseDeferUntilTrueOptions } from '../useDeferUntilTrue';

export type UseDeferUntilBreakpointOptions = UseDeferUntilTrueOptions & {
  /**
   * メディアクエリー変更時のデバウンス時間（ミリ秒）
   * デフォルトは100ms
   * @default 100
   */
  detectionDelay?: number;
};
