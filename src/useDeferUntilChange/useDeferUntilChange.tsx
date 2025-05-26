import useIsMounted from '@cozka/react-utils/useIsMounted';
import { set } from 'lodash';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { DeferRenderingResult, RenderingState } from '../types';
import useDeferUntilTrue from '../useDeferUntilTrue';
import { UseDeferUntilChangeOptions } from './types';

const NO_VALUE = Symbol('NO_VALUE');

/**
 * 値が変更されるまで描画を遅延させるhook
 * @param target 描画対象のノード
 * @param value 値
 * @param options オプション
 * @returns state（'pending', 'ready'）と状態に応じたノード
 */
export default function useDeferUntilChange<T extends ReactNode, P>(
  target: T,
  value: unknown,
  options: UseDeferUntilChangeOptions<P> = {},
): DeferRenderingResult<T | P> {
  const [prevValue, setPrevValue] = useState<unknown>(NO_VALUE);
  const isMounted = useIsMounted();
  const result = useDeferUntilTrue(target, prevValue === value, options);

  useEffect(() => {
    if (isMounted()) {
      setPrevValue(value);
    }
  }, [value]);

  console.log(result);

  return result;
}
