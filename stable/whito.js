import {get} from 'whito';
import chalk from "chalk";

let cdn = 'fastly';
let type = 'c'

function hitoGet(){
    get(cdn, type, (err, data) => {
        if (err) console.log(err);
        else {console.log(chalk.bold.blue(data))}
    })
    return
}

export {
    hitoGet
}
