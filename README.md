# @cozka/react-defer-rendering

This package provides functionality to render components when specific conditions are met.

`@cozka/react-defer-rendering` allows you to render elements only after certain conditions are satisfied.

**[日本語のREADMEはこちら](./README.ja.md)**

## Installation

```sh
npm install @cozka/react-defer-rendering
```

## Usage

You can pass the element you want to render into a hook, and render the returned `node` based on the current state.

```tsx
import useDeferUntilTimeout from '@cozka/react-defer-rendering/useDeferUntilTimeout';

function DeferedComponent() {
  // Renders <div>READY!</div> after 1000ms
  const { node } = useDeferUntilTimeout(<div>READY!</div>, 1000);
  return node;
}
```

## API

### `Common`

#### Options

| Property             | Type        | Description                                                              |
| -------------------- | ----------- | ------------------------------------------------------------------------ |
| `pending?`           | `ReactNode` | Node to render while in the pending state                                |
| `pendingDefer?`      | `number`    | Delay (in milliseconds) before rendering the `pending` node              |
| `error?`             | `ReactNode` | Node to render in case of error \*                                       |
| `errorDefer?`        | `number`    | Delay (in milliseconds) before rendering the `error` node \*             |
| `preserveOnceError?` | `boolean`   | If `true`, rendering control stops after the `error` node is rendered \* |
| `readyDefer?`        | `number`    | Delay (in milliseconds) before rendering the target node                 |
| `preserveOnceReady?` | `boolean`   | If `true`, rendering control stops after the target node is rendered     |

\* Only applicable for hooks that support an `error` state

#### Return Values

| Property | Type                                | Description                                                        |
| -------- | ----------------------------------- | ------------------------------------------------------------------ |
| `state`  | `'pending'` \| `'ready'` \| `error` | Current state. `error` is returned only from hooks that support it |
| `node`   | `ReactNode`                         | The node to render based on the current state                      |

---

### `useDeferUntilReady(target, state, options)`

Returns the appropriate node based on the current state.

#### Parameters

| Property   | Type                                | Description        |
| ---------- | ----------------------------------- | ------------------ |
| `target`   | `ReactNode`                         | The node to render |
| `state`    | `'pending'` \| `'ready'` \| `error` | Current state      |
| `options?` | [Common options](#options)          |                    |

#### Return Value

Same as [Return Values](#return-values)

### `useDeferUntilTrue(target, condition, options)`

Treats `true` as `ready` and `false` as `pending`, and returns the appropriate node accordingly.  
This hook does not have an `error` state.

#### Parameters

| Property    | Type                       | Description        |
| ----------- | -------------------------- | ------------------ |
| `target`    | `ReactNode`                | The node to render |
| `condition` | `boolean`                  | Current state      |
| `options?`  | [Common options](#options) |                    |

#### Return Value

Same as [Return Values](#return-values)

### `useDeferUntilTimeout(target, defer, options)`

Returns the target node after the time specified by `defer` has passed.  
This hook does not have an `error` state.

#### Parameters

| Property   | Type                       | Description                 |
| ---------- | -------------------------- | --------------------------- |
| `target`   | `ReactNode`                | The node to render          |
| `defer`    | `number`                   | Time delay before rendering |
| `options?` | [Common options](#options) |                             |

#### Return Value

Same as [Return Values](#return-values)

### `useDeferUntilResolved(target, callback, options)`

Returns the target node after the asynchronous function specified by `callback` has completed.

#### Parameters

| Property   | Type                       | Description                         |
| ---------- | -------------------------- | ----------------------------------- |
| `target`   | `ReactNode`                | The node to be rendered             |
| `callback` | `() => Promise<void>`      | A function that performs async work |
| `options?` | [Common options](#options) |                                     |

#### Return Value

Same as [Return Values](#return-values)

### `useDeferUntilFontReady(target, fontFamily, options)`

Returns the target node after the specified `fontFamily` has been loaded.

#### Parameters

| Property     | Type                                            | Description                |
| ------------ | ----------------------------------------------- | -------------------------- |
| `target`     | `ReactNode`                                     | The node to be rendered    |
| `fontFamily` | `string`                                        | The font family to monitor |
| `options?`   | [Common options](#options) & Additional options |                            |

#### Additional Options

| Property       | Type                                                              | Description                                                        |
| -------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| `fontVariant?` | `{ weight?: number \| string; style?: string; stretch?: string }` | Font details                                                       |
| `timeout?`     | `number`                                                          | Timeout duration (ms) for waiting on font load. Defaults to `4000` |
| `loader?`      | `() => Promise<void>`                                             | Function to load the font                                          |

#### Return Value

Same as [Return Values](#return-values)

## License

MIT License
