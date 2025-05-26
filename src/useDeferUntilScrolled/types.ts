import { ReactNode, RefObject } from 'react';
import { UseDeferUntilTrueOptions } from '../useDeferUntilTrue';

export type UseDeferUntilScrolledOptions<P extends ReactNode = ReactNode> =
  UseDeferUntilTrueOptions<P> & {
    /**
     * 監視するコンテナーの参照
     */
    containerRef?: RefObject<Element | null | undefined>;

    /**
     * スクロールイベントのデバウンス時間（ミリ秒）
     * デフォルトは100ms
     * @default 100
     */
    detectionDelay?: number;
  };
