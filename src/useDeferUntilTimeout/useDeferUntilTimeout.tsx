import useIsMounted from '@cozka/react-utils/useIsMounted';
import setTimeoutExtended from '@cozka/utils-lang/setTimeoutExtended';
import { ReactNode, useEffect, useState } from 'react';
import { DeferRenderingResult } from '../types';
import useDeferUntilTrue from '../useDeferUntilTrue';
import { UseDeferUntilTimeoutOptions } from './types';

/**
 * 指定の時間が経過するまで描画を遅延させるhook
 * @param target 描画対象のノード
 * @param defer 遅延させる時間(ms)
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilTimeout<T extends ReactNode, P>(
  target: T,
  defer: number | null | undefined,
  options: UseDeferUntilTimeoutOptions<P> = {},
): DeferRenderingResult<T | P> {
  const [condition, setCondition] = useState(!defer);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (defer != null) {
      if (defer <= 0) {
        // 既に指定時間を過ぎている場合は即座に描画
        setCondition(true);
        return;
      }
      const cancel = setTimeoutExtended(() => {
        if (isMounted()) {
          setCondition(true);
        }
      }, defer);
      return () => {
        cancel();
      };
    }
  }, []);

  return useDeferUntilTrue(target, condition, options);
}
