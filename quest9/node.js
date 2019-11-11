var data = [];

function add(id, name, surname, nickname, gender, image) {
  let a = {
    id: id,
    name: name,
    surname: surname,
    nickname: nickname,
    gender: gender,
    image: image
  };
  data.push(a);
  return;
}

function edit(id, name, surname, nickname, gender, image) {
  const index = find(id);
  if (index == -1) return;

  data[index].name = name == '' ? data[index].name : name;
  data[index].surname = surname == '' ? data[index].surname : surname;
  data[index].nickname = nickname == '' ? data[index].nickname : nickname;
  data[index].gender = gender == '' ? data[index].gender : gender;
  data[index].image = image == '' ? data[index].image : image;
  return data[index];
}

function del(id) {
  const index = find(id);
  if (index == -1) return;

  const deleteData = del[index];
  data.splice(index, 1);
  return deleteData;
}

function find(id) {
  for (index = 0; index < data.length; index++) {
    if (data[index].id == id) {
      return index;
    }
  }
  return -1;
}

add(1, 'Kanjana', 'Pednok', 'OIL', 'female', 'img');
add(2, 'Kanjana', 'Pednok', 'OIL', 'female', 'img');
add(3, 'Kanjana', 'Pednok', 'OIL', 'female', 'img');
add(4, 'Kanjana', 'Pednok', 'OIL', 'female', 'img');

//-----------------------------------------------
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const serve = require('koa-static');
const path = require('path');

// app.use(ctx => {
//   ctx.body = 'Hello World';
// });

// router.get('/', ctx => {
//   ctx.body = 'this is index page';
// });

app.use(serve(path.join(__dirname, 'public/quest4/')));

router.get('/echo', ctx => {
  const qr = JSON.parse(JSON.stringify(ctx.request.query));
  ctx.body = 'msg : ' + qr.msg;
});

router.get('/api/users', ctx => {
  ctx.body = data;
});

// router.post('/oil', aadd);

// function* aadd(next) {
//   let a = {
//     id: this.request.body.id,
//     name: this.request.body.name,
//     surname: this.request.body.surname,
//     nickname: this.request.body.nickname,
//     gender: this.request.body.gender,
//     image: this.request.body.image
//   };
//   data.push(a);
//   this.body = { message: 'New movie created.', location: '' + 5 };
//   yield next;
// }

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
