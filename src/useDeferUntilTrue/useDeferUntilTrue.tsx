import { ReactNode } from 'react';
import { DeferRenderingResult } from '../types';
import useDeferUntilReady from '../useDeferUntilReady';
import { UseDeferUntilTrueOptions } from './types';

/**
 * 条件がtrueになるまで描画を遅延させるhook
 * @param target 描画対象のノード
 * @param condition 条件
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilTrue<T extends ReactNode, P>(
  target: T,
  condition: boolean | null | undefined,
  options: UseDeferUntilTrueOptions<P>,
): DeferRenderingResult<T | P> {
  return useDeferUntilReady(target, condition ? 'ready' : 'pending', options);
}
