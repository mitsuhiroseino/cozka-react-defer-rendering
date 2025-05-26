import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import 'material-symbols';
import { FC, forwardRef } from 'react';
import useDeferUntilFontReady, {
  UseDeferUntilFontReadyOptions,
} from '../src/useDeferUntilFontReady';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilFontReadyOptions & {
  target?: string;
  fontFamily?: string;
};

const Component: FC<ComponentProps> = (props) => {
  const { target = 'OK', fontFamily, pending, error, ...options } = props;
  const { node, state } = useDeferUntilFontReady(
    <span className="material-symbols-outlined">{target}</span>,
    fontFamily,
    {
      pending: <>{pending}</>,
      error: <>{error}</>,
      ...options,
    },
  );
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
  title: 'useDeferUntilFontReady',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes,
  args: {
    target: 'home',
    fontFamily: 'Material Symbols Outlined',
    readyDefer: 1000,
  },
};

export const Pending: Story = {
  argTypes,
  args: {
    target: 'home',
    fontFamily: 'Material Symbols Outlined',
    pending: 'Pending...',
    readyDefer: 1000,
  },
};

export const PreserveOnceReady: Story = {
  argTypes,
  args: {
    target: 'home',
    fontFamily: 'Material Symbols Outlined',
    preserveOnceReady: true,
    readyDefer: 1000,
  },
};
