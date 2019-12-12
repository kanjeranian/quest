var data = [];
var currentID = 1;

export function getUsers() {
  return data;
}

export function createUser(user) {
  const newUser = {
    id: currentID,
    name: user.name,
    surname: user.surname,
    nickname: user.nickname,
    gender: user.gender,
    image: user.image
  };
  data.push(newUser);
  currentID++;
  return newUser;
}

export function editUser(id, changes) {
  const index = find(id);
  data[index].name = changes.name == null ? data[index].name : changes.name;
  data[index].surname =
    changes.surname == null ? data[index].surname : changes.surname;
  data[index].nickname =
    changes.nickname == null ? data[index].nickname : changes.nickname;
  data[index].gender =
    changes.gender == null ? data[index].gender : changes.gender;
  data[index].image = changes.image == null ? data[index].image : changes.image;
  return data[index];
}

export function deleteUser(id) {
  const index = find(id);
  if (index != -1) {
    data.splice(index, 1);
  }
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
