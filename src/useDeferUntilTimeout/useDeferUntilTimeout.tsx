import useIsMounted from '@cozka/react-utils/useIsMounted';
import { ReactNode, useEffect, useState } from 'react';
import { DeferRenderingResult } from '../types';
import useDeferUntilTrue from '../useDeferUntilTrue';
import { UseDeferUntilTimeoutOptions } from './types';

/**
 * 指定の時間まで描画を遅延させるhook
 * @param target 描画対象のノード
 * @param defer 遅延させる時間
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilTimeout(
  target: ReactNode,
  defer: number | null | undefined,
  options: UseDeferUntilTimeoutOptions = {},
): DeferRenderingResult {
  const [condition, setCondition] = useState(!defer);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (defer) {
      setTimeout(() => {
        if (isMounted()) {
          setCondition(true);
        }
      }, defer);
    }
  }, []);

  return useDeferUntilTrue(target, condition, options);
}
