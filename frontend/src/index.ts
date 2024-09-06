import express from 'express';
import { renderToString } from 'vue/server-renderer';
import { createSSRApp } from 'vue';

import App from './views/HomeView.vue';

import commonRouter from './router/ExpressRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log('env=', process.env.NODE_ENV);
// route
app.use('/api/common', commonRouter);

//routes
app.get('/*', async (req: any, res: any) => {
  const app = createSSRApp(App);
  const html = await renderToString(app, {});
  try {
    res.send(html);
  } catch (error) {
    res.sendStatus(500);
  }
});

//start
const PORT = 8080;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
console.log('start');
