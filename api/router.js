import { os } from '@orpc/server';

export const router = {
  ping: os.handler(() => 'pong: ' + new Date().toISOString()),
};
