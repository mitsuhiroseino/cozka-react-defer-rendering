import { ReactNode } from 'react';

/**
 * エラーの状態がある場合のオプションのベース
 */
export type DeferRenderingWithErrorOptionsBase = DeferRenderingOptionsBase & {
  /**
   * エラー時に表示するノード
   */
  error?: ReactNode;
};

/**
 * オプションのベース
 */
export type DeferRenderingOptionsBase = {
  /**
   * 表示待ち中に表示するノード
   */
  pending?: ReactNode;

  /**
   * 最終的に表示するノード
   */
  ready?: ReactNode;
};

/**
 * 描画に関する状態
 */
export type RenderingState = 'pending' | 'ready' | 'error';

/**
 * 現在の状態と状態変更用のハンドラーを返す戻り値
 */
export type DeferRenderingWithHandlersResult = DeferRenderingResult & {
  /**
   * 描画可能な状態になった時に実行するハンドラー
   * @returns
   */
  onReady?: () => void;

  /**
   * 描画不可能な状態になった時に実行するハンドラー
   * @returns
   */
  onError?: () => void;

  /**
   * 描画前の状態に戻すハンドラー
   * @returns
   */
  onPending?: () => void;
};

/**
 * 現在の状態を示す戻り値
 */
export type DeferRenderingResult = {
  /**
   * 描画状態
   */
  state: RenderingState;

  /**
   * 描画するノード
   */
  node: ReactNode | null | undefined;
};
