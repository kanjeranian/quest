// app.js : เป็นทางเข้าของโปรแกรม ไฟล์นี้จะต้องทำหน้าที่
// import library ที่จำเป็นต้องใช้ในการเริ่มโปรแกรม,
// เรียกใช้ไฟล์ router.js เพื่อเป็นส่วนประกอบให้กับ koa application
// และเริ่มการทำงาน web server ด้วยคำสั่ง listen()
// ไม่มีการประกาศ path ใหม่ของ router / ไม่มี logic ในการจัดการข้อมูล

import Koa from 'koa';
import router from './router';

const app = new Koa();
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const path = require('path');

app.use(serve(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(handle404Errors);

app.listen(3000);
console.log('Listening on port 3000');
