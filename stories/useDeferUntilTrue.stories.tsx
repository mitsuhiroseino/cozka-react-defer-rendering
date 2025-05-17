import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import useDeferUntilTrue, {
  UseDeferUntilTrueOptions,
} from '../src/useDeferUntilTrue';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilTrueOptions & {
  value?: boolean;
};

const Component: FC<ComponentProps> = (props) => {
  const { value, pending, ...options } = props;
  const { node, state } = useDeferUntilTrue(<>OK</>, value, {
    pending: <>{pending}</>,
    ...options,
  });
  return node;
};

const argTypes: ArgTypes<ComponentProps> = {
  value: {
    control: {
      type: 'boolean',
    },
    description: '値',
  },
  ...baseArgTypes,
};

const meta = {
  title: 'useDeferUntilTrue',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes,
  args: {
    value: false,
  },
};

export const Pending: Story = {
  argTypes,
  args: {
    value: false,
    pending: 'Pending...',
  },
};

export const RenderDefer: Story = {
  argTypes,
  args: {
    value: false,
    readyDefer: 1000,
  },
};

export const PreserveOnceReady: Story = {
  argTypes,
  args: {
    value: false,
    preserveOnceReady: true,
  },
};
