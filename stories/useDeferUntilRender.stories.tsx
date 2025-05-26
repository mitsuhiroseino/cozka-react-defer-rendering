import type { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { FC, forwardRef, useEffect, useState } from 'react';
import useDeferUntilRender, {
  UseDeferUntilRenderOptions,
} from '../src/useDeferUntilRender';
import { baseArgTypes } from './argTypes';

type ComponentProps = UseDeferUntilRenderOptions & {
  query: string;
};

const Component: FC<ComponentProps> = (props) => {
  const { query, pending, ...options } = props;
  const { node, state } = useDeferUntilRender(<>OK</>, query, {
    pending: <>{pending}</>,
    ...options,
  });
  const [isRendered, setRendered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRendered(true);
    }, 3000);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {isRendered && (
          <span id="observed-element" className="observed-el">
            Observed Element
          </span>
        )}
      </div>
      <div>{node}</div>
    </div>
  );
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
  title: 'useDeferUntilRender',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes,
  args: {
    query: '#observed-element',
    readyDefer: 1000,
  },
};

export const Pending: Story = {
  argTypes,
  args: {
    query: '.observed-el',
    pending: 'Pending...',
    readyDefer: 1000,
  },
};

export const PreserveOnceReady: Story = {
  argTypes,
  args: {
    query: '.observed-el',
    preserveOnceReady: true,
    readyDefer: 1000,
  },
};
