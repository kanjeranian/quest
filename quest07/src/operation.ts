import user_management = require("./user-management");

export interface OperationData {
  name: string;
  surname: string;
  nickname: string;
  gender: string;
  image: string;
}

export interface Operation {
  performOperation(): Promise<any>;
}

export class CreateOperation implements Operation {
  private data: OperationData;
  constructor(data: OperationData) {
    this.data = data;
  }
  async performOperation() {
    return await user_management.UserManager.getInstance().createUser(
      this.data
    );
  }
}

export class EditOperation implements Operation {
  private editID: number;
  private data: OperationData;
  constructor(id: number, data: OperationData) {
    this.editID = id;
    this.data = data;
  }
  async performOperation() {
    await user_management.UserManager.getInstance().editUser(
      this.editID,
      this.data
    );
  }
}

export class DeleteOperation implements Operation {
  private deleteID: number;
  constructor(id: number) {
    this.deleteID = id;
  }
  async performOperation() {
    await user_management.UserManager.getInstance().deleteUser(this.deleteID);
  }
}
