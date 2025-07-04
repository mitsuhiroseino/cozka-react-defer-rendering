import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import useDeferUntilOnReady, {
  UseDeferUntilOnReadyOptions,
} from '../src/useDeferUntilOnReady';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilOnReadyOptions & {};

const Component: FC<ComponentProps> = (props) => {
  const { pending, error, ...options } = props;
  const { node, state, onReady, onPending, onError } = useDeferUntilOnReady(
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
  ...baseArgTypes,
};

const meta = {
  title: 'useDeferUntilOnReady',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes,
  args: {
    readyDefer: 0,
  },
};

export const Pending: Story = {
  argTypes,
  args: {
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
    preserveOnceReady: true,
    pending: 'Pending...',
    error: 'Error!',
    readyDefer: 0,
  },
};

export const PreserveOnceError: Story = {
  argTypes,
  args: {
    preserveOnceError: true,
    pending: 'Pending...',
    error: 'Error!',
    readyDefer: 0,
  },
};
