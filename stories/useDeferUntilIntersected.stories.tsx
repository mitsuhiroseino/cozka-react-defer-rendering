import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC, useEffect, useRef } from 'react';
import useDeferUntilIntersected, {
  UseDeferUntilIntersectedOptions,
} from '../src/useDeferUntilIntersected';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilIntersectedOptions & {};

const Component: FC<ComponentProps> = (props) => {
  const { pending, ...options } = props;
  const elementRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { node, state } = useDeferUntilIntersected(<>OK</>, elementRef, {
    pending: <>{pending}</>,
    rootRef: containerRef,
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
  rootMargin: {
    control: {
      type: 'text',
    },
    description: 'CSS margin format for the root element',
  },
  threshold: {
    control: {
      type: 'number',
    },
    description: 'Intersection threshold (0 to 1)',
  },
  ...baseArgTypes,
};

const meta = {
  title: 'useDeferUntilIntersected',
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
