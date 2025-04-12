import debounce from 'lodash-es/debounce';
import { ReactNode, useEffect, useState } from 'react';
import { DeferRenderingResult } from '../types';
import useDeferUntilTrue from '../useDeferUntilTrue';
import { UseDeferUntilScrolledOptions } from './types';

/**
 * スクロール位置に基づいて描画を遅延させるhook
 * @param target 描画対象のノード
 * @param element 基準となる要素
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilScrolled(
  target: ReactNode,
  element: HTMLElement | null | undefined,
  options: UseDeferUntilScrolledOptions = {},
): DeferRenderingResult {
  const {
    container = window,
    detectionDelay = 100,
    preserveOnceReady,
    ...opts
  } = options;
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    const isWindow = container === window;
    const checkScroll = () => {
      if (element) {
        const containerElement = isWindow
          ? document.documentElement
          : container;
        const rect = element.getBoundingClientRect();
        const height = isWindow ? 'innerHeight' : 'clientHeight';
        const isVisible =
          rect.top < containerElement[height] && rect.bottom >= 0;

        return isVisible;
      } else {
        return false;
      }
    };

    // 初期チェック
    if (checkScroll()) {
      setCondition(true);
      return;
    }

    const debouncedHandleScroll = debounce(() => {
      const isVisible = checkScroll();
      setCondition(isVisible);
      if (preserveOnceReady) {
        observedTarget.removeEventListener('scroll', debouncedHandleScroll);
      }
    }, detectionDelay);

    // スクロールイベントリスナーの追加
    const observedTarget = isWindow ? window : container;
    observedTarget.addEventListener('scroll', debouncedHandleScroll);

    // クリーンアップ
    return () => {
      observedTarget.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [element, container]);

  return useDeferUntilTrue(target, condition, { preserveOnceReady, ...opts });
}
