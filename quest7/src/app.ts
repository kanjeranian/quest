import reader = require("./reader");
import operation = require("./operation");
import user_management = require("./user-management");

let path = process.argv;
let array = reader.readFile(path[(<any>path).length - 1]);

let n: number = (<any>array).length;

let array_operation: reader.OperationObject[] = [];
for (let i = 1; i <= n; i++) {
  let a: reader.OperationObject = reader.parse(array[i - 1]);
  array_operation.push(a);
}

async function processArray(array) {
  let i: number = 0;
  for (const item of array) {
    try {
      if (item instanceof reader.createObj) {
        await new operation.CreateOperation(item.data).performOperation();
      } else if (item instanceof reader.editObj) {
        await new operation.EditOperation(
          item.editID,
          item.data
        ).performOperation();
      } else if (item instanceof reader.deleteObj) {
        await new operation.DeleteOperation(item.deleteID).performOperation();
      } else {
        throw "invalid operation";
      }
      ++i;
      console.log("[" + i + "/" + n + "] operation succeeded");
    } catch (e) {
      console.log("ERROR:", e);
      return;
    }
  }
  await user_management.UserManager.getInstance().getUser();
}

processArray(array_operation);
