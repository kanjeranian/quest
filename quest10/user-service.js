const fs = require('fs');
var rawData = fs.readFileSync('data.json');
var AllData = JSON.parse(rawData);
var data = AllData.user.data;
var nextID = AllData.user.nextID;

function writeFile() {
  AllData.user.nextID = nextID;
  const jsonData = JSON.stringify(AllData);
  fs.writeFileSync('data.json', jsonData);
}

export function getUsers() {
  console.log(AllData);
  return data;
}

export function createUser(user) {
  var error = '';

  const newUser = {
    id: nextID,
    name: user.name,
    surname: user.surname,
    nickname: user.nickname,
    gender: user.gender,
    image: user.image
  };

  if (
    newUser.name == '' ||
    newUser.surname == '' ||
    newUser.nickname == '' ||
    newUser.gender == null ||
    newUser.image == ''
  ) {
    error = addError(error, 'Fields required');
  }

  if (error != '') {
    return {
      error: error
    };
  } else {
    data.push(newUser);
    nextID++;
    writeFile();
    return {
      data: newUser
    };
  }
}

export function editUser(id, changes) {
  var error = '';
  const index = find(id);

  if (index < 0) {
    error = addError(error, 'invalid id');
    return {
      error: error
    };
  }

  data[index].name = changes.name == '' ? data[index].name : changes.name;
  data[index].surname =
    changes.surname == '' ? data[index].surname : changes.surname;
  data[index].nickname =
    changes.nickname == '' ? data[index].nickname : changes.nickname;
  data[index].gender =
    changes.gender == null ? data[index].gender : changes.gender;
  data[index].image = changes.image == '' ? data[index].image : changes.image;

  writeFile();

  return {
    data: data[index]
  };
}

export function deleteUser(id) {
  const index = find(id);
  data.splice(index, 1);
  writeFile();
  return;
}
//----------------------------------others--------------------------------------------

export function find(id) {
  for (let index = 0; index < data.length; index++) {
    if (data[index].id == id) {
      return index;
    }
  }
  return -1;
}

export function addError(error, message) {
  return error == '' ? message : error + ', ' + message;
}
