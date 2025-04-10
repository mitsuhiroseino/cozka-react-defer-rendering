import { useEffect, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import { UseDeferUntilVisibleOptions } from './types';

/**
 * 基準となる要素がビューポートに入るまで描画を遅延させるhook
 * @param target 基準となる要素
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilVisible(
  target: HTMLElement | null | undefined,
  options: UseDeferUntilVisibleOptions = {},
): DeferRenderingResult {
  const { container = null, threshold = 0.1, ...nodes } = options;
  const [state, setState] = useState<RenderingState>('pending');

  useEffect(() => {
    if (target) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setState('ready');
          } else {
            setState('pending');
          }
        },
        {
          root: container,
          threshold,
        },
      );

      observer.observe(target);

      return () => {
        observer.disconnect(); // クリーンアップ
      };
    }
  }, [target, container, threshold]);

  return {
    state,
    node: nodes[state],
  };
}
