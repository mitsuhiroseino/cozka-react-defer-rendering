import useIsMounted from '@cozka/react-utils/useIsMounted';
import debounce from 'lodash-es/debounce';
import { useEffect, useState } from 'react';
import { DeferRenderingResult } from '../types';
import useDeferUntilTrue from '../useDeferUntilTrue';
import { UseDeferUntilBreakpointOptions } from './types';

/**
 * メディアクエリーが一致するまで描画を遅延させるhook
 * @param mediaQuery メディアクエリ（例: '(max-width: 768px)'）
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilBreakpoint(
  mediaQuery: string,
  options: UseDeferUntilBreakpointOptions = {},
): DeferRenderingResult {
  const { detectionDelay = 100, preserveOnceReady, ...opts } = options;
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);

    // 初期状態の設定
    const matches = mediaQueryList.matches;
    setCondition(matches);
    if (preserveOnceReady && matches) {
      // 一度readyになったらready状態を保持する場合で既にreadyな場合は何もしない
      return;
    }

    // メディアクエリの変更を監視
    const handleChange = debounce((event: MediaQueryListEvent) => {
      if (useIsMounted()) {
        const matches = event.matches;
        setCondition(matches);
        if (preserveOnceReady && matches) {
          // 一度readyになったらready状態を保持する場合でreadyになった場合はこれで終わり
          mediaQueryList.removeEventListener('change', handleChange);
        }
      }
    }, detectionDelay);

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [mediaQuery, preserveOnceReady, detectionDelay]);

  return useDeferUntilTrue(condition, { preserveOnceReady, ...opts });
}
