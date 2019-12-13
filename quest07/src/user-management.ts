import operation = require("./operation");
import axios from "axios";

export interface UserResult {
  id: number;
  name: string;
  surname: string;
  nickname: string;
  gender: "male" | "female";
  image: string;
}

export class UserManager {
  public static userManager = new UserManager();
  public constructor() {}
  public getUser() {
    return axios
      .get("https://sb-oil-web-bootcamp.herokuapp.com/users")
      .then(function(response) {
        let allData = response.data;
        let n = allData.data.length;
        for (var i = 0; i < n; i++) {
          var member = allData.data[i];
          var id = member.id;
          var name = member.name;
          var surname = member.surname;
          var nickname = member.nickname;
          var gender = member.gender;
          console.log(
            id + ". " + name + " " + surname + " (" + nickname + "), " + gender
          );
        }
      })
      .catch(function(error) {
        console.log("err:", error);
      });
  }

  public createUser(data: operation.OperationData) {
    return axios
      .post("https://sb-oil-web-bootcamp.herokuapp.com/users/", {
        name: data.name,
        surname: data.surname,
        nickname: data.nickname,
        gender: data.gender,
        image: data.image
      })
      .then(function(response) {
        var obj = response.data;
        var status = obj.status;
        if (status == 0) {
          throw obj.error;
        } else {
          // console.log("create complete");
        }
      });
  }
  public editUser(id: number, data: operation.OperationData) {
    return axios
      .post("https://sb-oil-web-bootcamp.herokuapp.com/users/" + id, {
        name: data.name,
        surname: data.surname,
        nickname: data.nickname,
        gender: data.gender,
        image: data.image
      })
      .then(function(response) {
        var obj = response.data;
        var status = obj.status;
        if (status == 0) {
          throw obj.error;
        } else {
          // console.log("edit complete");
        }
      });
  }

  public deleteUser(id: number) {
    return axios
      .delete("https://sb-oil-web-bootcamp.herokuapp.com/users/" + id)
      .then(function(response) {
        var obj = response.data;
        var status = obj.status;
        if (status == 0) {
          throw obj.error;
        } else {
          // console.log("delete complete");
        }
      });
  }
  public static getInstance() {
    return this.userManager;
  }
}
