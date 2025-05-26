import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import { RenderingState } from '../src/types';
import useDeferUntilReady, {
  UseDeferUntilReadyOptions,
} from '../src/useDeferUntilReady';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilReadyOptions & {
  value: RenderingState;
};

const Component: FC<ComponentProps> = (props) => {
  const { value, pending, error, ...options } = props;
  const { node, state } = useDeferUntilReady(<>OK</>, value, {
    pending: <>{pending}</>,
    error: <>{error}</>,
    ...options,
  });
  return node;
};

const argTypes: ArgTypes<ComponentProps> = {
  value: {
    control: {
      type: 'select',
    },
    options: ['pending', 'error', 'ready'],
    description: '値',
  },
  ...baseArgTypes,
};

const meta = {
  title: 'useDeferUntilReady',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes,
  args: {
    value: 'pending',
    readyDefer: 1000,
  },
};

export const Pending: Story = {
  argTypes,
  args: {
    value: 'pending',
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
    value: 'pending',
    preserveOnceReady: true,
    pending: 'Pending...',
    error: 'Error!',
    readyDefer: 1000,
  },
};

export const PreserveOnceError: Story = {
  argTypes,
  args: {
    value: 'pending',
    preserveOnceError: true,
    pending: 'Pending...',
    error: 'Error!',
    readyDefer: 1000,
  },
};
