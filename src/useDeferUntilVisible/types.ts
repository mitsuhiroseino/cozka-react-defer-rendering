import { ReactNode } from 'react';
import { UseDeferUntilTrueOptions } from '../useDeferUntilTrue';

export type UseDeferUntilVisibleOptions<P extends ReactNode = ReactNode> =
  UseDeferUntilTrueOptions<P> & {
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
