import useIsMounted from '@cozka/react-utils/useIsMounted';
import {} from '@cozka/utils-function';
import { useEffect, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import { UseDeferUntilTimeoutOptions } from './types';

/**
 * 指定の時間まで描画を遅延させるhook
 * @param defer 遅延させる時間
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilTimeout(
  defer: number | null | undefined,
  options: UseDeferUntilTimeoutOptions = {},
): DeferRenderingResult {
  const { ...nodes } = options;
  const [state, setState] = useState<RenderingState>(
    !!defer ? 'pending' : 'ready',
  );

  const isMounted = useIsMounted();

  useEffect(() => {
    if (defer) {
      setTimeout(() => {
        if (isMounted()) {
          setState('ready');
        }
      }, defer);
    }
  }, []);

  return {
    state,
    node: nodes[state],
  };
}
