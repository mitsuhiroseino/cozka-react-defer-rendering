import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC, forwardRef } from 'react';
import useDeferUntilChange, {
  UseDeferUntilChangeOptions,
} from '../src/useDeferUntilChange';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilChangeOptions & {
  value?: string;
};

const Component: FC<ComponentProps> = (props) => {
  const { value, pending, ...options } = props;
  const { node, state } = useDeferUntilChange(<>{value}</>, value, {
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
  title: 'useDeferUntilChange',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes,
  args: {
    value: 'OK',
    readyDefer: 1000,
  },
};

export const Pending: Story = {
  argTypes,
  args: {
    value: 'OK',
    pending: 'Pending...',
    readyDefer: 1000,
  },
};

export const PreserveOnceReady: Story = {
  argTypes,
  args: {
    value: 'OK',
    preserveOnceReady: true,
    readyDefer: 1000,
  },
};
