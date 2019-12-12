// ดูแลเรื่องการเก็บข้อมูล ทั้งการขอข้อมูล เพิ่มข้อมูล แก้ไขข้อมูล ลบข้อมูล ok
// มีตัวแปรที่เอาไว้เก็บข้อมูลรายชื่อ user ทั้งหมดและตัวแปร currentID อยู่ด้วย ok
// ไฟล์นี้จะต้องไม่มีการประกาศ path ใดๆทั้งสิ้น

// user-service.js
// ไฟล์นี้จะต้อง export function ออกมา 4 ฟังก์ชัน ได้แก่
// 1 getUsers() คืน array ของ user ทั้งหมด
// 2 createUser(user) คืน user ใหม่ที่ถูกสร้างขึ้นโดยใส่ id เข้าไปด้วย
// user เป็น object แสดงรายละเอียดของข้อมูลผู้ใช้ มีโครงสร้างดังนี้
// {
//   name: string,
//   surname: string,
//   nickname: string,
//   gender: string,
//   image: string
// }
// จะสันนิษฐานว่าทุกฟิลด์มีการกำหนดมาอย่างถูกต้องแล้ว ซึ่งจะต้องผ่านการตรวจสอบมาจาก router.js แล้ว
// 3 editUser(id, changes) แก้ไข user ที่มี id ตามสิ่งที่กำหนดใน changes แล้วคืน user ที่ถูกแก้ไข
// changes เป็น object แสดงการเปลี่ยนแปลงของข้อมูล มีโครงสร้างดังนี้
// {
//   name: string,
//   surname: string,
//   nickname: string,
//   gender: string,
//   image: string
// }
// แต่ละฟิลด์จะใส่หรือไม่ใส่ก็ได้ และจะแก้เฉพาะฟิลด์ที่ใส่
// 4 deleteUser(id) ลบผู้ใช้ที่มี id แล้วไม่คืนค่าใดๆ

var data = [];
var currentID = 1;

export function getUsers() {
  //คืน array ของ user ทั้งหมด
  return data;
}

export function createUser(user) {
  //คืน user ใหม่ที่ถูกสร้างขึ้นโดยใส่ id เข้าไปด้วย
  const newUser = {
    id: currentID,
    name: user.name,
    surname: user.surname,
    nickname: user.nickname,
    gender: user.gender,
    image: user.image
  };
  data.push(a);
  currentID++;
  return newUser;
}

export function editUser(id, changes) {
  // แก้ไข user ที่มี id ตามสิ่งที่กำหนดใน changes แล้วคืน user ที่ถูกแก้ไข
  // changes เป็น object แสดงการเปลี่ยนแปลงของข้อมูล
  const index = find(id);
  data[index].name = changes.name == null ? data[index].name : name;
  data[index].surname = changes.surname == null ? data[index].surname : surname;
  data[index].nickname =
    changes.nickname == null ? data[index].nickname : nickname;
  data[index].gender = changes.gender == null ? data[index].gender : gender;
  data[index].image = changes.image == null ? data[index].image : image;
  return data[index];
}

export function deleteUser(id) {
  //ลบผู้ใช้ที่มี id แล้วไม่คืนค่าใดๆ
  const index = find(id);
  if (index != -1) {
    data.splice(index, 1);
  }
  return;
}
//----------------------------------original--------------------------------------------

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

export function addError(error, message) {
  return error == '' ? message : error + ', ' + message;
}
