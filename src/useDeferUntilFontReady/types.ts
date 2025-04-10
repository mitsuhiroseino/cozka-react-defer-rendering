import { FontVariant } from 'fontfaceobserver';
import { DeferRenderingWithErrorOptionsBase } from '../types';

export type UseDeferUntilFontReadyOptions =
  DeferRenderingWithErrorOptionsBase & {
    /**
     *　フォントの詳細なスタイル
     */
    fontVariant?: FontVariant;

    /**
     * 読み込みに失敗した場合のタイムアウト（ミリ秒）
     * デフォルトは4000ms
     * @default 4000
     */
    timeout?: number;

    /**
     * フォントをロードする関数
     * @returns
     */
    loader?: () => Promise<void>;
  };
