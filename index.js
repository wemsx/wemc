#!/usr/bin/env node
import { program } from "commander";
import { getUtf, deUtf } from "./stable/utf.js";
import { httpGet, httpPost } from "./dev/http.js";
import { hitoGet, hitoOfficialGet } from "./stable/whito.js";
import { getIPAdress } from "./dev/ip.js";
import { updater } from "./dev/auto-update.js";
import chalk from "chalk";
const version = '0.4.1';

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
  .option("-h --headers [headers]", "headers")
  .action(async (url, dataToPost, headers) => {
    let dataAfterPost = await httpPost(url, dataToPost, headers);
    console.log(dataAfterPost);
  });

program
  .command("get <url>")
  .description("发起一个get请求")
  .action(async (url) => {
    let dataHere = await httpGet(url);
    console.log(dataHere);
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
  .option("-c --cdn [cdn]", "CDN",'gcore')
  .option("-t --type [type]", "句子种类",'c')
  .action((cdn, type) => {
    hitoGet(cdn, type)
  });
program
  .command("hito")
  .description("来条hito")
  .action(() => {
    hitoOfficialGet()
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
