import { FontVariant } from 'fontfaceobserver';
import { ReactNode } from 'react';
import { UseDeferUntilReadyOptions } from '../useDeferUntilReady';

export type UseDeferUntilFontReadyOptions<
  P extends ReactNode = ReactNode,
  E extends ReactNode = ReactNode,
> = UseDeferUntilReadyOptions<P, E> & {
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
