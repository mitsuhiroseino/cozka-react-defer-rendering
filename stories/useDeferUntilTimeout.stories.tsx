import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import React, { forwardRef } from 'react';
import useDeferUntilTimeout, {
  UseDeferUntilTimeoutOptions,
} from '../src/useDeferUntilTimeout';

type ComponentProps = UseDeferUntilTimeoutOptions & {
  defer?: number | null | undefined;
};

const Component = forwardRef<HTMLDivElement, ComponentProps>((props, ref) => {
  const { defer = 4000, ...options } = props;
  const { node, state } = useDeferUntilTimeout(
    <div ref={ref}>OK</div>,
    defer,
    options,
  );
  return node as any;
});

const meta = {
  title: 'useDeferUntilTimeout',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
