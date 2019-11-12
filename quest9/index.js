const Koa = require("koa");
const Router = require("koa-router");
const serve = require("koa-static");
const path = require("path");

const app = new Koa();
const router = new Router();

app.use(serve(path.join(__dirname, "public")));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
