// const fs = require("fs");

// fs.readFile("./test.txt", "utf-8", (error, data) => {
//   fs.mkdirSync("./files", () => {});

//   fs.writeFileSync("./files/test2.txt", `${data}New text!`, (error) => {
//     error ? console.log(error) : null;
//   });
// });

// setTimeout(() => {
//   if (fs.existsSync("./files/test2.txt")) {
//     fs.unlink("./files/test2.txt", () => {});
//   }
// }, 4000);
// setTimeout(() => {
//   if (fs.existsSync("./files")) {
//     fs.rmdir("./files", () => {});
//   }
// }, 6000);

const Logger = require("./log");
const logger = new Logger();

logger.on("some_event", (args) => {
  const { id, text } = args;
  console.log(id, text);
});

logger.log("User Logged");
