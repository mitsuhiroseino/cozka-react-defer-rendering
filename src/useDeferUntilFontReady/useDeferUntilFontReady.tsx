import FontFaceObserver from 'fontfaceobserver';
import { useEffect, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import { UseDeferUntilFontReadyOptions } from './types';

/**
 * 指定のフォントが利用可能になるまで描画を遅延させるhook
 * @param fontFamily フォントファミリー
 * @param options オプション
 * @returns state（'pending', 'ready', 'error'）と状態に応じたノード
 */
export default function useDeferUntilFontReady(
  fontFamily: string | null | undefined,
  options: UseDeferUntilFontReadyOptions,
): DeferRenderingResult {
  const { fontValiant, timeout = 3000, ...nodes } = options;
  const [state, setState] = useState<RenderingState>('pending');

  useEffect(() => {
    const observer = new FontFaceObserver(fontFamily, fontValiant);
    observer
      .load(null, timeout)
      .then(() => {
        setState('ready');
      })
      .catch(() => {
        setState('error');
      });
  }, [fontFamily, fontValiant, timeout]);

  return {
    state,
    node: nodes[state],
  };
}
