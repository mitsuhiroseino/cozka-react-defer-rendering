import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC } from 'react';
import useDeferUntilDate, {
  UseDeferUntilDateOptions,
} from '../src/useDeferUntilDate';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilDateOptions & {
  date?: Date | null | undefined;
};

const Component: FC<ComponentProps> = (props) => {
  const { date = new Date(Date.now() + 1000), pending, ...options } = props;
  const { node, state } = useDeferUntilDate(<>OK</>, date, {
    pending: <>{pending}</>,
    ...options,
  });
  return node;
};

const argTypes: ArgTypes<ComponentProps> = baseArgTypes;

const meta = {
  title: 'useDeferUntilDate',
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
