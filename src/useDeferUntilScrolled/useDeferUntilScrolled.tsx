import { useIsMounted } from '@cozka/react-utils';
import debounce from 'lodash-es/debounce';
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { DeferRenderingResult } from '../types';
import useDeferUntilTrue from '../useDeferUntilTrue';
import { UseDeferUntilScrolledOptions } from './types';

/**
 * スクロール位置に基づいて描画を遅延させるhook
 * @param target 描画対象のノード
 * @param elementRef 基準となる要素の参照
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilScrolled<T extends ReactNode, P>(
  target: T,
  elementRef: RefObject<HTMLElement | null | undefined>,
  options: UseDeferUntilScrolledOptions<P> = {},
): DeferRenderingResult<T | P> {
  const defaultContainerRef = useRef<Element | null | undefined>(
    document.documentElement,
  );
  const {
    containerRef = defaultContainerRef,
    detectionDelay = 100,
    preserveOnceReady,
    ...opts
  } = options;
  const [condition, setCondition] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    const element = elementRef.current;
    const container = containerRef.current;
    if (element && container) {
      const checkScroll = () => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < container.clientHeight && rect.bottom >= 0;

        return isVisible;
      };

      // 初期チェック
      if (checkScroll()) {
        setCondition(true);
        return;
      }

      // スクロールイベントリスナーの追加
      const debouncedHandleScroll = debounce(() => {
        const isVisible = checkScroll();
        if (isMounted()) {
          setCondition(isVisible);
        }
        if (preserveOnceReady) {
          container.removeEventListener('scroll', debouncedHandleScroll);
        }
      }, detectionDelay);
      container.addEventListener('scroll', debouncedHandleScroll);

      // クリーンアップ
      return () => {
        container.removeEventListener('scroll', debouncedHandleScroll);
      };
    }
  }, [elementRef.current, containerRef.current]);

  return useDeferUntilTrue(target, condition, { preserveOnceReady, ...opts });
}
