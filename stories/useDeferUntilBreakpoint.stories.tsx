import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC, forwardRef } from 'react';
import useDeferUntilBreakpoint, {
  UseDeferUntilBreakpointOptions,
} from '../src/useDeferUntilBreakpoint';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilBreakpointOptions & {
  value: string;
};

const Component: FC<ComponentProps> = (props) => {
  const { value, pending, ...options } = props;
  const { node, state } = useDeferUntilBreakpoint(<>OK</>, value, {
    pending: <>{pending}</>,
    ...options,
  });
  return node;
};

const argTypes: ArgTypes<ComponentProps> = {
  value: {
    control: {
      type: 'text',
    },
    description: '値',
  },
  ...baseArgTypes,
};

const meta = {
  title: 'useDeferUntilBreakpoint',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes,
  args: {
    value: '(orientation: portrait)',
    readyDefer: 1000,
  },
};

export const Pending: Story = {
  argTypes,
  args: {
    value: '(orientation: portrait)',
    pending: 'Pending...',
    readyDefer: 1000,
  },
};

export const PreserveOnceReady: Story = {
  argTypes,
  args: {
    value: '(orientation: portrait)',
    preserveOnceReady: true,
    readyDefer: 1000,
  },
};
