import { useEffect, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import { UseDeferUntilTrueOptions } from './types';

/**
 * 戻り値として返す`onReady`が実行されるまで描画を遅延させるhook
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilTrue(
  condition: boolean | null | undefined,
  options: UseDeferUntilTrueOptions,
): DeferRenderingResult {
  const { ...nodes } = options;
  const [state, setState] = useState<RenderingState>('pending');

  useEffect(() => {
    if (condition) {
      setState('ready');
    } else {
      setState('pending');
    }
  }, [condition]);

  return {
    state,
    node: nodes[state],
  };
}
