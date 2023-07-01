import { get } from "whito";
import { httpGet } from "../dev/http.js";
import chalk from "chalk";

function hitoGet(cdn, type) {
    get(cdn, type, (err, data) => {
        if (err) return console.log(halk.bold.red("出错啦！"));
        else {
            return console.log(halk.bold.blueBright(data));
        }
    });
}

async function hitoOfficialGet() {
    let hitokoto = await httpGet(`https://v1.hitokoto.cn`)
    return console.log(chalk.bold.blueBright(hitokoto.hitokoto));
}

export { hitoGet, hitoOfficialGet };
