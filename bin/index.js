#! /usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
program
  .command("create <name>")
  .description("create a new project")
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", "覆盖目标目录（如果存在）")
  .action((name, options) => {
    // 打印结果，输出用户手动输入的项目名字
    require("../lib/create")(name, options);
  });

// 配置版本号信息
program
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");

program.on("--help", () => {
  // 使用 figlet 绘制 Logo
  console.log(
    "\r\n" +
      figlet.textSync("ami", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
  );
  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`);
});
// 解析用户执行命令传入参数
program.parse(process.argv);
