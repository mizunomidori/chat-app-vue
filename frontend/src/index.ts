import express from 'express';
import type { Request, Response } from 'express';
import { renderToString } from 'vue/server-renderer';
import { createSSRApp } from 'vue';

import App from './views/HomeView.vue';

import commonRouter from './router/ExpressRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log('env =', process.env.NODE_ENV);
// route
app.use('/api/common', commonRouter);

//routes
app.get('/*', async (req: Request, res: Response) => {
  const app = createSSRApp(App);
  const html = await renderToString(app, {});
  try {
    res.send(html);
  } catch (error) {
    res.sendStatus(500);
  }
});

//routes
app.get('/', async (req: Request, res: Response) => {
  const oidcData = req.headers['x-amzn-oidc-data'];
  if (oidcData && typeof oidcData === 'string') {
    const payload = oidcData.split('.')[1];
    // payloadをdecodeしてjson形式に変換
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'));
    return { name: decoded.name ?? '', email: decoded.email ?? '' };
  } else {
    return { name: '', email: '' };
  }
});

const PORT = 8080;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
