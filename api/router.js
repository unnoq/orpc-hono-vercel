import { os } from '@orpc/server';

export const router = {
  ping: os
    .route({ method: 'GET', path: '/ping' })
    .handler(() => 'pong: ' + new Date().toISOString()),
};
