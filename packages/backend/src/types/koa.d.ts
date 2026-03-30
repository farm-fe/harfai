import type { DefaultState, DefaultContext } from 'koa';
import type { Router } from '@koa/router';

declare module 'koa' {
  interface DefaultContext {
    requestId: string;
  }
}

export type AppContext = DefaultContext & {
  requestId: string;
};

export type AppState = DefaultState;
