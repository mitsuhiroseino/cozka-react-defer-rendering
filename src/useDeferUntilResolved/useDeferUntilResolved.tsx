import useIsMounted from '@cozka/react-utils/useIsMounted';
import { useEffect, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import { UseDeferUntilResolvedOptions } from './types';

/**
 * 処理の完了まで描画を遅延させるhook
 * @param callback 処理
 * @param options オプション
 * @returns state（'pending', 'ready', 'error'）と状態に応じたノード
 */
export default function useDeferUntilResolved(
  callback: (() => Promise<any>) | null | undefined,
  options: UseDeferUntilResolvedOptions = {},
): DeferRenderingResult {
  const { ...nodes } = options;
  const [state, setState] = useState<RenderingState>(
    callback ? 'pending' : 'ready',
  );
  const isMounted = useIsMounted();

  useEffect(() => {
    callback()
      .then(() => {
        if (isMounted()) {
          setState('ready');
        }
      })
      .catch((err) => {
        if (isMounted()) {
          setState('error');
          console.error(err);
        }
      });
  }, []);

  return {
    state,
    node: nodes[state],
  };
}
