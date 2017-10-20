var mongoose = require("mongoose")
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/blog")
var db = mongoose.connection

db.on("error", (err) => {
    console.error("数据库连接失败", err);
})
db.on("open", () => {
    console.log("打开数据库成功！");
})

module.exports = mongoose

