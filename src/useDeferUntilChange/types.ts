import { ReactNode } from 'react';
import { UseDeferUntilTrueOptions } from '../useDeferUntilTrue';

export type UseDeferUntilChangeOptions<P extends ReactNode = ReactNode> =
  UseDeferUntilTrueOptions<P> & {
    /**
     * 初期値も値の変更とみなすか
     */
    initialValueAsChange?: boolean;
  };
