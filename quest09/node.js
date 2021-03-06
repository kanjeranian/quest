var data = [];
var currentID = 1;

function add(name, surname, nickname, gender, image) {
  let a = {
    id: currentID,
    name: name,
    surname: surname,
    nickname: nickname,
    gender: gender,
    image: image
  };
  data.push(a);
  currentID++;
  return find(a.id);
}

function edit(index, name, surname, nickname, gender, image) {
  data[index].name = name == null ? data[index].name : name;
  data[index].surname = surname == null ? data[index].surname : surname;
  data[index].nickname = nickname == null ? data[index].nickname : nickname;
  data[index].gender = gender == null ? data[index].gender : gender;
  data[index].image = image == null ? data[index].image : image;
  return;
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

function addError(error, message) {
  return error == "" ? message : error + ", " + message;
}

//-----------------------------------------------

const koa = require("koa");
const router = require("koa-router")();
var bodyParser = require("koa-bodyparser"); /////

var app = new koa();

const Router = require("koa-router");
const serve = require("koa-static");
const path = require("path");

const route = new Router();

app.use(serve(path.join(__dirname, "public")));
app.use(route.routes());
app.use(route.allowedMethods());

//------------------------------------------------

// GET /echo : read query parameter (msg)
router.get("/echo", function(ctx) {
  const qr = JSON.parse(JSON.stringify(ctx.request.query));
  ctx.body = qr.msg;
});

// GET /api/users : return array value
router.get("/api/users", function(ctx) {
  ctx.body = { status: 1, data: data };
});

// POST /api/users : add new user
router.post("/api/users", function(ctx) {
  var status = 1;
  var error = "";
  const name = ctx.request.body.name;
  const surname = ctx.request.body.surname;
  const nickname = ctx.request.body.nickname;
  const gender = ctx.request.body.gender;
  const image = ctx.request.body.image;
  if (
    name == "" ||
    surname == "" ||
    nickname == "" ||
    gender == null ||
    image == ""
  ) {
    error = addError(error, "Fields required");
  }
  if (!(gender == "male" || gender == "female")) {
    error = addError(error, "Invalid gender value");
  }
  if (error != "") {
    status = 0;
    ctx.body = {
      status: status,
      error: error
    };
    return;
  }
  const index = add(name, surname, nickname, gender, image);
  ctx.body = {
    status: status,
    data: data[index]
  };
});

//POST /api/users/:id : edit user by id
router.post("/api/users/:id", function(ctx) {
  const id = ctx.params.id;
  const index = find(id);
  var status = 1;
  var error = "";
  ctx.body = "index :" + index;
  if (index < 0) error = addError(error, "invalid id");
  if (index >= 0) {
    const name =
      ctx.request.body.name == "" ? data[index].name : ctx.request.body.name;
    const surname =
      ctx.request.body.surname == ""
        ? data[index].surname
        : ctx.request.body.surname;
    const nickname =
      ctx.request.body.nickname == ""
        ? data[index].nickname
        : ctx.request.body.nickname;
    const gender =
      ctx.request.body.gender == null
        ? data[index].gender
        : ctx.request.body.gender;
    const image =
      ctx.request.body.image == "" ? data[index].image : ctx.request.body.image;

    if (!(gender == "male" || gender == "female" || gender == null)) {
      error = addError(error, "Invalid gender value");
    }
    if (error != "") {
      status = 0;
      ctx.request.body = {
        status: status,
        error: error
      };
      return;
    }
    edit(index, name, surname, nickname, gender, image);
    ctx.body = {
      status: status,
      data: data[index]
    };
    console.log(ctx.request.response);
  }
});

//DELETE /api/users/:id : Delete user by id
router.delete("/api/users/:id", function(ctx) {
  const id = ctx.params.id;
  const index = find(id);
  var status = 1;
  var error = "";
  ctx.request.body = "index :" + index;
  if (index < 0) error = addError(error, "invalid id");
  if (error != "") {
    status = 0;
    ctx.body = {
      status: status,
      error: error
    };
    return;
  }
  del(id);
  ctx.body = {
    status: status
  };
});

router.get("/not_found", printErrorMessage);

function* printErrorMessage(ctx) {
  ctx.request.status = 404;
  ctx.request.body = "Sorry we do not have ctx resource.";
}

function* handle404Errors() {
  if (404 != this.status) return;
  this.redirect("/not_found");
}

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(handle404Errors);

app.listen(3000);
console.log("Listening on port 3000");
