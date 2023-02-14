const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const Generator = require('./generator');
const chalk = require("chalk");
module.exports = async function (name, options) {
  const cwd = process.cwd(); // 选择目录
  const targetAir = path.join(cwd, name);
  // 判断目录是否已经存在？
  if (fs.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetAir);
    } else {
      // TODO：询问用户是否确定要覆盖
      // 在终端输出询问用户是否覆盖：
      const inquirerParams = [
        {
          name: "action",
          type: "list",
          message: "目标文件目录已经存在，请选择如下操作：",
          choices: [
            { name: "替换当前目录", value: "replace" },
            { name: "移除已有目录", value: "remove" },
            { name: "取消当前操作", value: "cancel" },
          ],
        },
      ];
      let inquirerData = await inquirer.prompt(inquirerParams);
      if (!inquirerData.action || inquirerData.action == 'cancel') {
        return;
      } else if (inquirerData.action === "remove") {
        // 移除已存在的目录
        console.log(chalk.red(`\r\nRemoving...`,targetAir,`\r\n`));
        await fs.remove(targetAir);
      }
    }
  }
  const generator = new Generator(name,targetAir);
  generator.create();
};
