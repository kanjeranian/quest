// ดูแลเรื่องการเก็บข้อมูล ทั้งการขอข้อมูล เพิ่มข้อมูล แก้ไขข้อมูล ลบข้อมูล
// มีตัวแปรที่เอาไว้เก็บข้อมูลรายชื่อ user ทั้งหมดและตัวแปร currentID อยู่ด้วย
// ไฟล์นี้จะต้องไม่มีการประกาศ path ใดๆทั้งสิ้น

// user-service.js
// ไฟล์นี้จะต้อง export function ออกมา 4 ฟังก์ชัน ได้แก่
// getUsers() คืน array ของ user ทั้งหมด
// createUser(user) คืน user ใหม่ที่ถูกสร้างขึ้นโดยใส่ id เข้าไปด้วย
// user เป็น object แสดงรายละเอียดของข้อมูลผู้ใช้ มีโครงสร้างดังนี้
// {
//   name: string,
//   surname: string,
//   nickname: string,
//   gender: string,
//   image: string
// }
// จะสันนิษฐานว่าทุกฟิลด์มีการกำหนดมาอย่างถูกต้องแล้ว ซึ่งจะต้องผ่านการตรวจสอบมาจาก router.js แล้ว
// editUser(id, changes) แก้ไข user ที่มี id ตามสิ่งที่กำหนดใน changes แล้วคืน user ที่ถูกแก้ไข
// changes เป็น object แสดงการเปลี่ยนแปลงของข้อมูล มีโครงสร้างดังนี้
// {
//   name: string,
//   surname: string,
//   nickname: string,
//   gender: string,
//   image: string
// }
// แต่ละฟิลด์จะใส่หรือไม่ใส่ก็ได้ และจะแก้เฉพาะฟิลด์ที่ใส่
// deleteUser(id) ลบผู้ใช้ที่มี id แล้วไม่คืนค่าใดๆ
