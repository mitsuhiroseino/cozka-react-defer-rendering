import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
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
  const { onReadyDelay, onErrorDelay, onPendingDelay, ...nodes } = options;
  const [state, setState] = useState<RenderingState>('pending');
  const onReady = useMemo(() => {
    const fn = () => setState('ready');
    return onReadyDelay != null ? debounce(fn, onReadyDelay) : fn;
  }, [onReadyDelay]);
  const onError = useMemo(() => {
    const fn = () => setState('error');
    return onErrorDelay != null ? debounce(fn, onErrorDelay) : fn;
  }, [onErrorDelay]);
  const onPending = useMemo(() => {
    const fn = () => setState('pending');
    return onPendingDelay != null ? debounce(fn, onPendingDelay) : fn;
  }, [onPendingDelay]);

  return {
    state,
    node: nodes[state],
    onReady,
    onError,
    onPending,
  };
}
