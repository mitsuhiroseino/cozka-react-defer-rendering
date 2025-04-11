import useIsMounted from '@cozka/react-utils/useIsMounted';
import { useEffect, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import useDeferUntilStateChange from '../useDeferUntilReady';
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
  const [state, setState] = useState<RenderingState>(
    callback ? 'pending' : 'ready',
  );
  const isMounted = useIsMounted();

  useEffect(() => {
    if (callback) {
      setState('pending');
      callback()
        .then(() => {
          if (isMounted()) {
            setState('ready');
          }
        })
        .catch(() => {
          if (isMounted()) {
            setState('error');
          }
        });
    }
  }, [callback]);

  return useDeferUntilStateChange(state, options);
}
