var labelWithTime = "label " + Date.now();
console.time(labelWithTime);

var fs = require("fs");

fs.readFile("in.txt", function (err, buf) {
    write(buf.toString().trim());
});

function write(data_prev) {
    var data_arr = data_prev.split(" ");
    data_arr.sort(function (a, b) {
        return a - b
    });
    fs.writeFile("out.txt", data_arr.join(" "), (err) => {
        if (err) console.log(err);
        console.timeEnd(labelWithTime);
    });
}