import debounce from 'lodash-es/debounce';
import { useEffect, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import { UseDeferUntilScrolledOptions } from './types';

/**
 * スクロール位置に基づいて描画を遅延させるhook
 * @param target 要素の参照
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilScrolled(
  target: HTMLElement | null | undefined,
  options: UseDeferUntilScrolledOptions = {},
): DeferRenderingResult {
  const { container = window, detectionDelay = 100, ...nodes } = options;
  const [state, setState] = useState<RenderingState>('pending');

  useEffect(() => {
    const isWindow = container === window;
    const handleScroll = () => {
      if (target) {
        const containerElement = isWindow
          ? document.documentElement
          : container;
        const rect = target.getBoundingClientRect();
        const height = isWindow ? 'innerHeight' : 'clientHeight';
        const isVisible =
          rect.top < containerElement[height] && rect.bottom >= 0;

        if (isVisible) {
          setState('ready');
        } else {
          setState('pending');
        }
      }
    };

    // 初期チェック
    handleScroll();

    const debouncedHandleScroll = debounce(handleScroll, detectionDelay);
    // スクロールイベントリスナーの追加
    const observedTarget = isWindow ? window : container;
    observedTarget.addEventListener('scroll', debouncedHandleScroll);

    // クリーンアップ
    return () => {
      observedTarget.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [target, container]);

  return {
    state,
    node: nodes[state],
  };
}
