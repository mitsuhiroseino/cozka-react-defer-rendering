import { useDeferUntilReadyOptions } from '../useDeferUntilReady';

export type UseDeferUntilOnReadyOptions = useDeferUntilReadyOptions & {
  /**
   * onReadyのデバウンス時間（ミリ秒）
   * 未指定の場合は即時処理
   */
  onReadyDelay?: number;

  /**
   * onErrorのデバウンス時間（ミリ秒）
   * 未指定の場合は即時処理
   */
  onErrorDelay?: number;

  /**
   * onPendingのデバウンス時間（ミリ秒）
   * 未指定の場合は即時処理
   */
  onPendingDelay?: number;
};
