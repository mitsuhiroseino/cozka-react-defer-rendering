import useIsMounted from '@cozka/react-utils/useIsMounted';
import { useEffect, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import useDeferUntilTrue from '../useDeferUntilTrue';
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

  return useDeferUntilTrue(condition, options);
}
