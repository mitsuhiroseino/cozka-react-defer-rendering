import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import useDeferUntilCalledCount, {
  UseDeferUntilCalledCountOptions,
} from '../src/useDeferUntilCalledCount';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilCalledCountOptions & {};

const Component: FC<ComponentProps> = (props) => {
  const { pending, error, ...options } = props;
  const { node, state, onReady, onPending, onError } = useDeferUntilCalledCount(
    <>OK</>,
    {
      pending: <>{pending}</>,
      error: <>{error}</>,
      ...options,
    },
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <button onClick={onReady}>Ready</button>
        <button onClick={onPending}>Pending</button>
        <button onClick={onError}>Error</button>
      </div>
      <div>{node}</div>
    </div>
  );
};

const argTypes: ArgTypes<ComponentProps> = {
  onReadyCount: {
    control: {
      type: 'number',
    },
    description: 'readyになる為のonReadyの呼び出し回数',
  },
  onPendingCount: {
    control: { type: 'number' },
    description: 'pendingになる為のonPendingの呼び出し回数',
  },
  onErrorCount: {
    control: { type: 'number' },
    description: 'errorになる為のonErrorの呼び出し回数',
  },
  ...baseArgTypes,
};

const meta = {
  title: 'useDeferUntilCalledCount',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes,
  args: {
    onReadyCount: 5,
    onErrorCount: 3,
    onPendingCount: 2,
    readyDefer: 0,
  },
};

export const Pending: Story = {
  argTypes,
  args: {
    onReadyCount: 5,
    onErrorCount: 3,
    onPendingCount: 2,
    pending: 'Pending...',
    error: 'Error!',
    pendingDefer: 0,
    readyDefer: 0,
    errorDefer: 0,
  },
};

export const PreserveOnceReady: Story = {
  argTypes,
  args: {
    onReadyCount: 5,
    onErrorCount: 3,
    onPendingCount: 2,
    preserveOnceReady: true,
    pending: 'Pending...',
    error: 'Error!',
    readyDefer: 0,
  },
};

export const PreserveOnceError: Story = {
  argTypes,
  args: {
    onReadyCount: 5,
    onErrorCount: 3,
    onPendingCount: 2,
    preserveOnceError: true,
    pending: 'Pending...',
    error: 'Error!',
    readyDefer: 0,
  },
};
