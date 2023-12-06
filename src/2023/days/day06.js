import {getInput} from "../../getinput.js";
import _ from "lodash";

export async function day(day) {
   
    stars(11)
    stars(12)
    
}

function productWays(times,records){
    return times.reduce((product, time, index) => {
        const dists = Array.from({ length: time + 1 }, (_, speed) => speed * (time - speed));
        return product * dists.filter(dist => dist > records[index]).length;
    }, 1);
}

export function stars(star){

    let times = star == 11 ? [57,72,69,92] : [57726992]
    let records = star == 11 ? [291,1172,1176,2026] : [291117211762026]
    let product = 1

    console.log(`star${star}: ${productWays(times,records)}`)
}