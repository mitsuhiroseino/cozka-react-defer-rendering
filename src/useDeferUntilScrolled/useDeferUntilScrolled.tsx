import { useIsMounted } from '@cozka/react-utils';
import debounce from 'lodash-es/debounce';
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { DeferRenderingResult } from '../types';
import useDeferUntilTrue from '../useDeferUntilTrue';
import { UseDeferUntilScrolledOptions } from './types';

/**
 * 縦または横スクロール位置に基づいて描画を遅延させるhook
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
  const defaultRootRef = useRef<Element | null | undefined>(
    document.documentElement,
  );
  const {
    rootRef = defaultRootRef,
    rootMargin = 0,
    detectionDelay = 100,
    preserveOnceReady,
    direction = 'vertical',
    ...opts
  } = options;
  const [condition, setCondition] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    const element = elementRef.current;
    const root = rootRef.current;
    if (element && root) {
      const isVisible =
        direction === 'vertical'
          ? (rect: DOMRect) =>
              rect.top - rootMargin < root.clientHeight &&
              rect.bottom + rootMargin >= 0
          : (rect: DOMRect) =>
              rect.left - rootMargin < root.clientWidth &&
              rect.right + rootMargin >= 0;
      const checkScroll = () => {
        const rect = element.getBoundingClientRect();
        return isVisible(rect);
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
          root.removeEventListener('scroll', debouncedHandleScroll);
        }
      }, detectionDelay);
      root.addEventListener('scroll', debouncedHandleScroll);

      // クリーンアップ
      return () => {
        root.removeEventListener('scroll', debouncedHandleScroll);
      };
    }
  }, [
    elementRef.current,
    rootRef.current,
    rootMargin,
    detectionDelay,
    direction,
    preserveOnceReady,
  ]);

  return useDeferUntilTrue(target, condition, { preserveOnceReady, ...opts });
}
