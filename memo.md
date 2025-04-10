| パターン                            | 説明                               | フック名案                                             |
| ----------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| ✅ 任意の非同期関数の完了まで待つ   | Promise の完了待ち                 | useDeferUntilResolved                                  |
| ⏳ 指定時間が経過するまで待つ       | setTimeout ベース                  | useDeferUntilTimeout                                   |
| 👀 ビューポートに入るまで待つ       | Intersection Observer              | useDeferUntilVisible                                   |
| 🔁 条件が true になるまで待つ       | 任意の predicate を評価            | useDeferUntilCondition or useDeferUntilTrue            |
| ⬇️ スクロール位置が条件を満たすまで | ページ下部や特定位置までスクロール | useDeferUntilScrolled or useDeferUntilScrolledToBottom |
| 📱 メディアクエリが一致するまで     | (min-width: 768px) など            | useDeferUntilMedia                                     |
| 🖱️ クリックなどの操作があるまで待つ | 要素へのインタラクション           | useDeferUntilClick, useDeferUntilInteraction           |
| 🎥 次のアニメーションフレームまで   | requestAnimationFrame              | useDeferUntilNextFrame                                 |
| 💨 ブラウザのアイドル状態になるまで | requestIdleCallback                | useDeferUntilIdle                                      |
