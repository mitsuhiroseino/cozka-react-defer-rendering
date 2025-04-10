import { useCallback, useState } from 'react';
import { DeferRenderingWithHandlersResult, RenderingState } from '../types';
import { UseDeferUntilReadyOptions } from './types';

/**
 * 戻り値として返す`onReady`が実行されるまで描画を遅延させるhook
 * @param options オプション
 * @returns state（'pending', 'ready', 'error'）と状態に応じたノードと状態変更用のハンドラー
 */
export default function useDeferUntilReady(
  options: UseDeferUntilReadyOptions,
): DeferRenderingWithHandlersResult {
  const { ...nodes } = options;
  const [state, setState] = useState<RenderingState>('pending');
  const onReady = useCallback(() => setState('ready'), []);
  const onError = useCallback(() => setState('error'), []);
  const onPending = useCallback(() => setState('pending'), []);

  return {
    state,
    node: nodes[state],
    onReady,
    onError,
    onPending,
  };
}
