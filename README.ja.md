# @cozka/react-defer-rendering

条件に合致した時点でコンポーネントを描画する機能を提供するパッケージです。

`@cozka/react-defer-rendering` は、条件に合致した時点でエレメントを描画する機能を提供するパッケージです。

**[English README is available here](./README.md)**

## インストール

```sh
npm install @cozka/react-defer-rendering
```

## 使い方

描画したいエレメントをフックに渡し、帰ってきた`node`を描画することで、
状態に応じた表示を行うことができます。

```tsx
import useDeferUntilTimeout from '@cozka/react-defer-rendering/useDeferUntilTimeout';

function DeferedComponent() {
  // 1000ms後に`<div>READY!</div>`を描画
  const { node } = useDeferUntilTimeout(<div>READY!</div>, 1000);
  return node;
}
```

## API

### `共通`

#### オプション

| プロパティ           | 型          | 説明                                                                         |
| -------------------- | ----------- | ---------------------------------------------------------------------------- |
| `pending?`           | `ReactNode` | 描画待ちの間に描画するノード                                                 |
| `pendingDefer?`      | `number`    | `pending`のノードを描画する際の遅延時間(ミリ秒)                              |
| `error?`             | `ReactNode` | エラーの際に描画するノード \*                                                |
| `errorDefer?`        | `number`    | `error`のノードを描画する際の遅延時間(ミリ秒) \*                             |
| `preserveOnceError?` | `boolean`   | `true`を指定した場合、`error`のノードの描画後は描画に関する制御を行わない \* |
| `readyDefer?`        | `number`    | 対象のノードを描画する際の遅延時間(ミリ秒)                                   |
| `preserveOnceReady?` | `boolean`   | `true`を指定した場合、対象ノードの描画後は描画に関する制御を行わない         |

\*: エラーの状態があるフックでのみ設定可能

#### 戻り値

| プロパティ | 型                                  | 説明                                                    |
| ---------- | ----------------------------------- | ------------------------------------------------------- |
| `state`    | `'pending'` \| `'ready'` \| `error` | 現在の状態。`error`はエラーの状態があるフックのみが返す |
| `node`     | `ReactNode`                         | 現在の状態で表示するノード                              |

### `useDeferUntilReady(target, state, options)`

現在の状態に応じたノードを返します。

#### 引数

| プロパティ | 型                                  | 説明             |
| ---------- | ----------------------------------- | ---------------- |
| `target`   | `ReactNode`                         | 描画対象のノード |
| `state`    | `'pending'` \| `'ready'` \| `error` | 現在の状態       |
| `options?` | 共通の[オプション](#オプション)     |                  |

#### 戻り値

共通の[戻り値](#戻り値)

### `useDeferUntilTrue(target, condition, options)`

`true`を`ready`、`false`を`pending`として扱い、それに応じたノードを返します。  
`error`のステートを持たないフックです。

#### 引数

| プロパティ  | 型                              | 説明             |
| ----------- | ------------------------------- | ---------------- |
| `target`    | `ReactNode`                     | 描画対象のノード |
| `condition` | `boolean`                       | 現在の状態       |
| `options?`  | 共通の[オプション](#オプション) |                  |

#### 戻り値

共通の[戻り値](#戻り値)

### `useDeferUntilTimeout(target, defer, options)`

`defer`で指定した時間が経過した後に描画対象のノードを返します。  
`error`のステートを持たないフックです。

#### 引数

| プロパティ | 型                              | 説明                 |
| ---------- | ------------------------------- | -------------------- |
| `target`   | `ReactNode`                     | 描画対象のノード     |
| `defer`    | `number`                        | 描画を遅延させる時間 |
| `options?` | 共通の[オプション](#オプション) |                      |

#### 戻り値

共通の[戻り値](#戻り値)

### `useDeferUntilResolved(target, callback, options)`

`callback`で指定した非同期関数が処理を完了した後に描画対象のノードを返します。

#### 引数

| プロパティ | 型                              | 説明                   |
| ---------- | ------------------------------- | ---------------------- |
| `target`   | `ReactNode`                     | 描画対象のノード       |
| `callback` | `() => Promise<void>`           | 非同期の処理を行う関数 |
| `options?` | 共通の[オプション](#オプション) |                        |

#### 戻り値

共通の[戻り値](#戻り値)

### `useDeferUntilFontReady(target, fontFamily, options)`

`fontFamily`で指定したフォントが読み込まれた後に描画対象のノードを返します。

#### 引数

| プロパティ   | 型                                               | 説明                         |
| ------------ | ------------------------------------------------ | ---------------------------- |
| `target`     | `ReactNode`                                      | 描画対象のノード             |
| `fontFamily` | `string`                                         | 監視対象のフォントファミリー |
| `options?`   | 共通の[オプション](#オプション) & 追加オプション |                              |

#### 追加オプション

| プロパティ     | 型                                                                                                        | 説明                                                                   |
| -------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `fontVariant?` | `{ weight?: number \| string \| undefined; style?: string \| undefined; stretch?: string \| undefined; }` | フォントの詳細                                                         |
| `timeout?`     | `number`                                                                                                  | フォント読み込みを待つ際のタイムアウト時間(ミリ秒)。デフォルトは`4000` |
| `loader?`      | `() => Promise<void>`                                                                                     | フォントをロードする処理                                               |

#### 戻り値

共通の[戻り値](#戻り値)

## ライセンス

MIT License
