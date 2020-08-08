import Router from 'koa-router';
import { getUsers, createUser, editUser, deleteUser } from './user-service';
const router = Router();

// GET /echo : read query parameter (msg)
router.get('/echo', function(ctx) {
  const qr = JSON.parse(JSON.stringify(ctx.request.query));
  ctx.body = qr.msg;
});

// GET /api/users : return array value
router.get('/api/users', function(ctx) {
  const data = getUsers();
  ctx.body = { status: 1, data: data };
});

// POST /api/users : create user
router.post('/api/users', function(ctx) {
  const name = ctx.request.body.name;
  const surname = ctx.request.body.surname;
  const nickname = ctx.request.body.nickname;
  const gender = ctx.request.body.gender;
  const image = ctx.request.body.image;

  const user = {
    name: name,
    surname: surname,
    nickname: nickname,
    gender: gender,
    image: image
  };

  const response = createUser(user);
  if (response.data != undefined) {
    ctx.body = {
      status: 1,
      data: response.data
    };
  } else {
    ctx.body = {
      status: 0,
      error: response.error
    };
  }
});

//POST /api/users/:id : edit user by id
router.post('/api/users/:id', function(ctx) {
  const id = ctx.params.id;
  const name = ctx.request.body.name;
  const surname = ctx.request.body.surname;
  const nickname = ctx.request.body.nickname;
  const gender = ctx.request.body.gender;
  const image = ctx.request.body.image;

  const change = {
    name: name,
    surname: surname,
    nickname: nickname,
    gender: gender,
    image: image
  };

  const response = editUser(id, change);
  if (response.data != undefined) {
    ctx.body = {
      status: 1,
      data: response.data
    };
  } else {
    ctx.body = {
      status: 0,
      error: response.error
    };
  }
});

//DELETE /api/users/:id : Delete user by id
router.delete('/api/users/:id', function(ctx) {
  const id = ctx.params.id;
  deleteUser(id);
  ctx.body = {
    status: 1
  };
});

export default router;
