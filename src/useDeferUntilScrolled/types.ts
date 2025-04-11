import { UseDeferUntilTrueOptions } from '../useDeferUntilTrue';

export type UseDeferUntilScrolledOptions = UseDeferUntilTrueOptions & {
  /**
   * 監視するコンテナー
   */
  container?: Element;

  /**
   * スクロールイベントのデバウンス時間（ミリ秒）
   * デフォルトは100ms
   * @default 100
   */
  detectionDelay?: number;
};
