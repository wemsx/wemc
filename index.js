#!/usr/bin/env node
import { program } from "commander";
import { getUtf, deUtf } from "./stable/utf.js";
import { httpGet, httpPost } from "./dev/http.js";
import { hitoGet } from "./stable/whito.js";
import { getIPAdress } from "./dev/ip.js";
import { updater } from "./dev/auto-update.js";
import chalk from "chalk";
const version = '0.3.1';

program.version(version, "-v,--version");

const error = chalk.bold.red;
const update = chalk.bold.blue;
const ip = chalk.bold.blueBright;

program
  .command("utf <string>")
  .description("将字符串与utf-8编码互化")
  .option("-d --decode", "decode")
  .action((str, options) => {
    if (!options.decode) {
      console.log(getUtf(str));
    } else {
      console.log(deUtf(str));
    }
  });

program
  .command("post <url>")
  .description("向url发送post请求")
  .option("-d --data <data>", "data")
  .option("-d --headers [headers]", "headers")
  .action(async (url) => {
    let data = await httpPost(url, this.opts().data, this.opts().headers);
    console.log(data);
  });

program
  .command("get <url>")
  .description("发起一个get请求")
  .action(async (url) => {
    let data = await httpGet(url);
    console.log(data);
  });

program
  .command("clear")
  .description("清空终端")
  .action(() => {
    console.clear()
    console.log(update('已清空终端'))
  });

program
  .command("whito")
  .description("来条whito")
  .action(() => {
    hitoGet()
  });

program
  .command("ip")
  .description("获取本机内网ip")
  .action(() => {
    console.log(ip(getIPAdress()))
  });

program
  .command("update")
  .description("检查更新")
  .action(() => {
    updater(version,(res)=>console.log(update(res)));
  });
program.parse(process.argv);
