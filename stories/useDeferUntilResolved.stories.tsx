import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC, useCallback, useRef } from 'react';
import { RenderingState } from '../src/types';
import useDeferUntilResolved, {
  UseDeferUntilResolvedOptions,
} from '../src/useDeferUntilResolved';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilResolvedOptions & {};

const Component: FC<ComponentProps> = (props) => {
  const { pending, error, ...options } = props;
  const stateRef = useRef<RenderingState>('pending');
  const callback = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      const id = setInterval(() => {
        if (stateRef.current === 'ready') {
          clearInterval(id);
          resolve();
        } else if (stateRef.current === 'error') {
          clearInterval(id);
          reject();
        }
      }, 300);
    });
  }, [stateRef.current]);
  const { node, state } = useDeferUntilResolved(<>OK</>, callback, {
    pending: <>{pending}</>,
    error: <>{error}</>,
    ...options,
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <button onClick={() => (stateRef.current = 'ready')}>Ready</button>
        <button onClick={() => (stateRef.current = 'pending')}>Pending</button>
        <button onClick={() => (stateRef.current = 'error')}>Error</button>
      </div>
      <div>{node}</div>
    </div>
  );
};

const argTypes: ArgTypes<ComponentProps> = {
  ...baseArgTypes,
};

const meta = {
  title: 'useDeferUntilResolved',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes,
  args: {
    readyDefer: 1000,
  },
};

export const Pending: Story = {
  argTypes,
  args: {
    pending: 'Pending...',
    error: 'Error!',
    pendingDefer: 1000,
    readyDefer: 1000,
    errorDefer: 1000,
  },
};

export const PreserveOnceReady: Story = {
  argTypes,
  args: {
    preserveOnceReady: true,
    pending: 'Pending...',
    error: 'Error!',
    readyDefer: 1000,
  },
};

export const PreserveOnceError: Story = {
  argTypes,
  args: {
    preserveOnceError: true,
    pending: 'Pending...',
    error: 'Error!',
    readyDefer: 1000,
  },
};
