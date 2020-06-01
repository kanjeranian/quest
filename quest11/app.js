const koa = require('koa');
import router from './router.js';

const app = new koa();
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const path = require('path');

app.use(serve(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
console.log('Listening on port 3000');
