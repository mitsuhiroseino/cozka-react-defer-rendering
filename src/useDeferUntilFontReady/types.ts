import { FontVariant } from 'fontfaceobserver';
import { useDeferUntilReadyOptions } from '../useDeferUntilReady';

export type UseDeferUntilFontReadyOptions = useDeferUntilReadyOptions & {
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
