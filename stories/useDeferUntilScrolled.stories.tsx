import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC, useCallback, useRef } from 'react';
import { RenderingState } from '../src/types';
import useDeferUntilScrolled, {
  UseDeferUntilScrolledOptions,
} from '../src/useDeferUntilScrolled';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilScrolledOptions & {};

const Component: FC<ComponentProps> = (props) => {
  const { pending, ...options } = props;
  const elementRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { node, state } = useDeferUntilScrolled(<>OK</>, elementRef, {
    pending: <>{pending}</>,
    containerRef,
    ...options,
  });

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 200,
        width: 300,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <div
        ref={elementRef}
        style={{
          position: 'absolute',
          left: 400,
          top: 400,
          height: 80,
          width: 160,
        }}
      >
        {node}
      </div>
    </div>
  );
};

const argTypes: ArgTypes<ComponentProps> = {
  ...baseArgTypes,
};

const meta = {
  title: 'useDeferUntilScrolled',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes,
  args: {
    readyDefer: 1000,
  },
};

export const Pending: Story = {
  argTypes,
  args: {
    pending: 'Pending...',
    pendingDefer: 1000,
    readyDefer: 1000,
  },
};

export const PreserveOnceReady: Story = {
  argTypes,
  args: {
    preserveOnceReady: true,
    pending: 'Pending...',
    readyDefer: 1000,
  },
};
