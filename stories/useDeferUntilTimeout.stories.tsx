import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import useDeferUntilTimeout, {
  UseDeferUntilTimeoutOptions,
} from '../src/useDeferUntilTimeout';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilTimeoutOptions & {
  defer?: number | null | undefined;
};

const Component: FC<ComponentProps> = (props) => {
  const { defer = 2000, pending, ...options } = props;
  const { node, state } = useDeferUntilTimeout(<>OK</>, defer, {
    pending: <>{pending}</>,
    ...options,
  });
  return node;
};

const argTypes: ArgTypes<ComponentProps> = baseArgTypes;

const meta = {
  title: 'useDeferUntilTimeout',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes,
  args: {},
};

export const Pending: Story = {
  argTypes,
  args: {
    pending: 'Pending...',
  },
};
