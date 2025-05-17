import { ArgTypes } from '@storybook/react';
import {
  DeferRenderingOptionsBase,
  DeferRenderingWithErrorOptionsBase,
} from '../src/types';

export const baseArgTypes: ArgTypes<DeferRenderingOptionsBase> = {
  pending: {
    control: {
      type: 'text',
    },
    description: '表示待ち中に表示するノード',
  },
  pendingDefer: {
    control: {
      type: 'number',
    },
    description: 'pendingを表示する際の遅延時間（ミリ秒）',
  },
  readyDefer: {
    control: {
      type: 'number',
    },
    description: 'readyを表示する際の遅延時間（ミリ秒）',
  },
  preserveOnceReady: {
    control: {
      type: 'boolean',
    },
    description:
      '一旦readyになったらready状態を保持するかどうか。trueの場合、ready状態になった後にpending状態に戻すことができない。',
  },
};

export const withErrorArgTypes: ArgTypes<DeferRenderingWithErrorOptionsBase> = {
  ...baseArgTypes,
  error: {
    control: {
      type: 'text',
    },
    description: 'エラー時に表示するノード',
  },
  errorDefer: {
    control: {
      type: 'number',
    },
    description: 'errorを表示する際の遅延時間（ミリ秒）',
  },
  preserveOnceError: {
    control: {
      type: 'boolean',
    },
    description:
      '一旦errorになったらerror状態を保持するかどうか。trueの場合、error状態になった後にpending状態に戻すことができない。',
  },
};
