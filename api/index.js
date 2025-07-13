import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { router } from './router.js';
import { OpenAPIHandler } from '@orpc/openapi/fetch';

const app = new Hono().basePath('/api');

const openapiHandler = new OpenAPIHandler(router);

app.use('/*', async (c, next) => {
  const { matched, response } = await openapiHandler.handle(c.req.raw, {
    prefix: '/rpc',
    context: {}, // Provide initial context if needed
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
