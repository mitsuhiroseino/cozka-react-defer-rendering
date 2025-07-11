import debounce from 'lodash-es/debounce';
import { ReactNode, useMemo, useState } from 'react';
import { DeferRenderingWithHandlersResult, RenderingState } from '../types';
import useDeferUntilReady from '../useDeferUntilReady';
import { UseDeferUntilOnReadyOptions } from './types';

/**
 * 戻り値として返す`onReady`が実行されるまで描画を遅延させるhook
 * @param target 描画対象のノード
 * @param options オプション
 * @returns state（'pending', 'ready', 'error'）と状態に応じたノードと状態変更用のハンドラー
 */
export default function useDeferUntilCalledCount<T extends ReactNode, P, E>(
  target: T,
  options: UseDeferUntilOnReadyOptions<P, E>,
): DeferRenderingWithHandlersResult<T | P | E> {
  const { onReadyDelay, onErrorDelay, onPendingDelay, ...opts } = options;
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
    ...useDeferUntilReady(target, state, opts),
    onPending,
    onError,
    onReady,
  };
}
