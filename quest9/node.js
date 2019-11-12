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

var app = new koa();

data = [];

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
  const qr = JSON.parse(JSON.stringify(ctx.request.query));
  const name = qr.name;
  const surname = qr.surname;
  const nickname = qr.nickname;
  const gender = qr.gender;
  const img = qr.image;
  if (
    name == null ||
    surname == null ||
    nickname == null ||
    gender == null ||
    img == null
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
  const index = add(name, surname, nickname, gender, img);
  ctx.body = {
    status: status,
    data: data[index]
  };
  console.log(data[index]);
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
    const qr = JSON.parse(JSON.stringify(ctx.request.query));
    const name = qr.name;
    const surname = qr.surname;
    const nickname = qr.nickname;
    const gender = qr.gender;
    const image = qr.image;

    if (!(gender == "male" || gender == "female" || gender == null)) {
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
    edit(index, name, surname, nickname, gender, image);
    ctx.body = {
      status: status,
      data: data[index]
    };
  }
});

//DELETE /api/users/:id : Delete user by id
router.delete("/api/users/:id", function(ctx) {
  const id = ctx.params.id;
  const index = find(id);
  var status = 1;
  var error = "";
  ctx.body = "index :" + index;
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
  ctx.status = 404;
  ctx.body = "Sorry we do not have ctx resource.";
}

function* handle404Errors() {
  if (404 != this.status) return;
  this.redirect("/not_found");
}

app.use(router.routes()).use(router.allowedMethods());
app.use(handle404Errors);

app.listen(3000);
console.log("Listening on port 3000");
