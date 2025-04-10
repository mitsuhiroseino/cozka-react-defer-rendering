import { FontVariant } from 'fontfaceobserver';
import { DeferRenderingWithErrorOptionsBase } from '../types';

export type UseDeferUntilFontReadyOptions =
  DeferRenderingWithErrorOptionsBase & {
    /**
     *　フォントの詳細なスタイル
     */
    fontValiant?: FontVariant;

    /**
     * 読み込みに失敗した場合のタイムアウト（ミリ秒）
     */
    timeout?: number;
  };
