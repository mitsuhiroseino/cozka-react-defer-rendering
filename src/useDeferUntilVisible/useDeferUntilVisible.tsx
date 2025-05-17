import useIsMounted from '@cozka/react-utils/useIsMounted';
import { ReactNode, useEffect, useState } from 'react';
import { DeferRenderingResult } from '../types';
import useDeferUntilTrue from '../useDeferUntilTrue';
import { UseDeferUntilVisibleOptions } from './types';

/**
 * 基準となる要素がビューポートに入るまで描画を遅延させるhook
 * @param target 描画対象のノード
 * @param element 基準となる要素
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilVisible<T extends ReactNode, P>(
  target: T,
  element: HTMLElement | null | undefined,
  options: UseDeferUntilVisibleOptions<P> = {},
): DeferRenderingResult<T | P> {
  const { container = null, threshold = 0.1, ...opts } = options;
  const [condition, setCondition] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (element) {
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

      observer.observe(element);

      return () => {
        observer.disconnect(); // クリーンアップ
      };
    }
  }, [element, container, threshold]);

  return useDeferUntilTrue(target, condition, opts);
}
