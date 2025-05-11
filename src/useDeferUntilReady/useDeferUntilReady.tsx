import useIsMounted from '@cozka/react-utils/useIsMounted';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import { useDeferUntilReadyOptions } from './types';

/**
 * ステートが'ready'になるまで描画を遅延させるhook
 * @param target 描画対象のノード
 * @param state ステート（'pending', 'ready', 'error'）
 * @param options オプション
 * @returns state（'pending', 'ready', 'error'）と状態に応じたノード
 */
export default function useDeferUntilReady(
  target: ReactNode,
  state: RenderingState,
  options: useDeferUntilReadyOptions = {},
): DeferRenderingResult {
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
  if (preserveOnceReady && latest === 'ready') {
    // 一度readyになったらready状態を保持する
    state = latest;
  } else if (preserveOnceError && latest === 'error') {
    // 一度errorになったらerror状態を保持する
    state = latest;
  }
  latestState.current = state;

  const { nextNode, defer } = {
    pending: { nextNode: pending, defer: pendingDefer },
    error: { nextNode: error, defer: errorDefer },
    ready: { nextNode: target, defer: readyDefer },
  }[state];
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
  }, [state]);

  return {
    state,
    node: node ?? <></>,
  };
}
