import { ReactNode } from 'react';
import { useDeferUntilReadyOptions } from '../useDeferUntilReady';

export type UseDeferUntilOnReadyOptions<
  P extends ReactNode = ReactNode,
  E extends ReactNode = ReactNode,
> = useDeferUntilReadyOptions<P, E> & {
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
