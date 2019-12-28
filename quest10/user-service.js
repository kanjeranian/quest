var data = [];
var currentID = 1;

export function getUsers() {
  return data;
}

export function createUser(user) {
  var error = '';

  const newUser = {
    id: currentID,
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
    currentID++;
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

  return {
    data: data[index]
  };
}

export function deleteUser(id) {
  const index = find(id);
  data.splice(index, 1);
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
