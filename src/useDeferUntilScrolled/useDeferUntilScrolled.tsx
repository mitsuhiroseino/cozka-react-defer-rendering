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
    container = document.documentElement,
    detectionDelay = 100,
    preserveOnceReady,
    ...opts
  } = options;
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < container.clientHeight && rect.bottom >= 0;

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

    // スクロールイベントリスナーの追加
    const debouncedHandleScroll = debounce(() => {
      const isVisible = checkScroll();
      setCondition(isVisible);
      if (preserveOnceReady) {
        container.removeEventListener('scroll', debouncedHandleScroll);
      }
    }, detectionDelay);
    container.addEventListener('scroll', debouncedHandleScroll);

    // クリーンアップ
    return () => {
      container.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [element, container]);

  return useDeferUntilTrue(target, condition, { preserveOnceReady, ...opts });
}
