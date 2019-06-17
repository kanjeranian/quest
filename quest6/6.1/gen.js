data = "";
for (i = 50000; i >= 1; i--) {
    if (i == 1) {
        data += Math.floor(Math.random() * 50001);
    } else {
        data += Math.floor(Math.random() * 50001) + " ";
    }
}

var fs = require("fs");
write(data);

function write(data) {
    fs.writeFile("in.txt", data, (err) => {
        if (err) console.log(err);
    });
}