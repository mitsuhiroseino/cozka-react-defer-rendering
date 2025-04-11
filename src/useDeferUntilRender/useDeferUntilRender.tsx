import { useEffect, useState } from 'react';
import { DeferRenderingResult } from '../types';
import useDeferUntilTrue from '../useDeferUntilTrue';
import { UseDeferUntilBreakpointOptions } from './types';

/**
 * セレクターに一致するエレメントが描画されるまで描画を遅延させるhook
 * @param query クエリセレクター（例: '.my-class'）
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilBreakpoint(
  query: string,
  options: UseDeferUntilBreakpointOptions = {},
): DeferRenderingResult {
  const { interval = 400, preserveOnceReady, ...opts } = options;
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    if (query) {
      const intervalId = setInterval(() => {
        const element = document.querySelector(query);
        if (element) {
          setCondition(true);
          if (preserveOnceReady) {
            // 一度readyになったらready状態を保持する場合はintervalをクリアする
            clearInterval(intervalId);
          }
        } else {
          setCondition(false);
        }
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [query]);

  return useDeferUntilTrue(condition, { preserveOnceReady, ...opts });
}
