import useIsMounted from '@cozka/react-utils/useIsMounted';
import { ReactNode, useEffect, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import useDeferUntilReady from '../useDeferUntilReady';
import { UseDeferUntilResolvedOptions } from './types';

/**
 * 処理の完了まで描画を遅延させるhook
 * @param target 描画対象のノード
 * @param callback 処理
 * @param options オプション
 * @returns state（'pending', 'ready', 'error'）と状態に応じたノード
 */
export default function useDeferUntilResolved<T extends ReactNode, P, E>(
  target: T,
  callback: (() => Promise<void>) | null | undefined,
  options: UseDeferUntilResolvedOptions<P, E> = {},
): DeferRenderingResult<T | P | E> {
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

  return useDeferUntilReady(target, state, options);
}
