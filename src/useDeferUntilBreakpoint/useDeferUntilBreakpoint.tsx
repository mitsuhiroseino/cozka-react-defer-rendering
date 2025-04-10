import debounce from 'lodash-es/debounce';
import { useEffect, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import { UseDeferUntilBreakpointOptions } from './types';

/**
 * メディアクエリーが一致するまで描画を遅延させるhook
 * @param query メディアクエリ（例: '(max-width: 768px)'）
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilBreakpoint(
  query: string,
  options: UseDeferUntilBreakpointOptions = {},
): DeferRenderingResult {
  const { detectionDelay = 100, ...nodes } = options;
  const [state, setState] = useState<RenderingState>('pending');

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // 初期状態の設定
    if (mediaQueryList.matches) {
      setState('ready');
    } else {
      setState('pending');
    }

    // メディアクエリの変更を監視
    const handleChange = debounce((event: MediaQueryListEvent) => {
      if (event.matches) {
        setState('ready');
      } else {
        setState('pending');
      }
    }, detectionDelay);

    mediaQueryList.addEventListener('change', handleChange);

    // クリーンアップ: イベントリスナーの削除
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return {
    state,
    node: nodes[state],
  };
}
