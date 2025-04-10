import { DeferRenderingOptionsBase } from '../types';

export type UseDeferUntilVisibleOptions = DeferRenderingOptionsBase & {
  /**
   * 監視するコンテナー
   * デフォルトはnull（ビューポート）
   */
  container?: Element;

  /**
   * ビューポートに基準となる要素がどの程度の割合入ったら描画するか(0～1)
   * デフォルトは0.1（10%）
   * @default 0.1
   */
  threshold?: number;
};
