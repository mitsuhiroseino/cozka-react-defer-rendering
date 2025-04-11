import useIsMounted from '@cozka/react-utils/useIsMounted';
import { useEffect, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import useDeferUntilTrue from '../useDeferUntilTrue';
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
  const { container = null, threshold = 0.1, ...opts } = options;
  const [condition, setCondition] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (target) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (isMounted()) {
            const entry = entries[0];
            setCondition(entry.isIntersecting);
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

  return useDeferUntilTrue(condition, opts);
}
