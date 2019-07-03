import * as fs from "fs";

import operation = require("./operation");

export interface OperationObject {
  operation: string;
  editID: number;
  deleteID: number;
  data: operation.OperationData;
}

export class createObj implements OperationObject {
  operation: string;
  editID: number;
  deleteID: number;
  data: operation.OperationData;

  constructor(operation: string, data: operation.OperationData) {
    this.operation = operation;
    this.data = data;
  }
}

export class editObj implements OperationObject {
  operation: string;
  editID: number;
  deleteID: number;
  data: operation.OperationData;

  constructor(
    operation: string,
    editID: number,
    data: operation.OperationData
  ) {
    this.operation = operation;
    this.editID = editID;
    this.data = data;
  }
}
export class deleteObj implements OperationObject {
  operation: string;
  editID: number;
  deleteID: number;
  data: operation.OperationData;

  constructor(operation: string, deleteID: number) {
    this.operation = operation;
    this.deleteID = deleteID;
  }
}

export function readFile(filePath: string) {
  let content = fs.readFileSync(filePath, "utf8");
  let all = JSON.parse(content);
  return all;
}

export function parse(json): OperationObject {
  let op = json.operation;
  if (op == "create") return new createObj(op, json.data);
  if (op == "edit") return new editObj(op, json.editId, json.data);
  if (op == "delete") return new deleteObj(op, json.deleteId);
  return;
}
