import useIsMounted from '@cozka/react-utils/useIsMounted';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import { UseDeferUntilReadyOptions } from './types';

/**
 * ステートが'ready'になるまで描画を遅延させるhook
 * @param target 描画対象のノード
 * @param state ステート（'pending', 'ready', 'error'）
 * @param options オプション
 * @returns state（'pending', 'ready', 'error'）と状態に応じたノード
 */
export default function useDeferUntilReady<T extends ReactNode, P, E>(
  target: T,
  state: RenderingState,
  options: UseDeferUntilReadyOptions<P, E> = {},
): DeferRenderingResult<T | P | E> {
  const {
    pending,
    error,
    pendingDefer,
    errorDefer,
    readyDefer,
    preserveOnceError,
    preserveOnceReady,
  } = options;

  const latestState = useRef<RenderingState>(null);
  const latest = latestState.current;
  let current = state;
  if (preserveOnceReady && latest === 'ready') {
    // 一度readyになったらready状態を保持する
    current = latest;
  } else if (preserveOnceError && latest === 'error') {
    // 一度errorになったらerror状態を保持する
    current = latest;
  }
  latestState.current = current;

  const { nextNode, defer } = {
    pending: { nextNode: pending, defer: pendingDefer },
    error: { nextNode: error, defer: errorDefer },
    ready: { nextNode: target, defer: readyDefer },
  }[current];
  const [node, setNode] = useState(() => (defer == null ? nextNode : null));
  const isMounted = useIsMounted();

  useEffect(() => {
    if (defer == null) {
      // 遅延なし
      setNode(nextNode);
      return;
    } else {
      // 遅延あり
      const timeoutId = setTimeout(() => {
        if (isMounted()) {
          setNode(nextNode);
        }
      }, defer);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [current]);

  return {
    state: current,
    node,
  };
}
