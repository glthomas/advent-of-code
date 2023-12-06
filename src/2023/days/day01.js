import {getInput} from "../../getinput.js";
import _ from "lodash";
// import math from 'mathjs';

stars(1);

export async function stars(day) {
    const response = await getInput(day).then((response) => {
        star(response.rawData, response.inputArray, 2*day-1)
        star(response.rawData, response.inputArray, 2*day)
    })
}

export function star(rawData, inArr, star){

    let nums = inArr
        .map(w => star == 1 ? w : w
            .replaceAll("one","o1e")
            .replaceAll("two","t2o")
            .replaceAll("three","t3e")
            .replaceAll("four","4")
            .replaceAll("five","5e")
            .replaceAll("six","6")
            .replaceAll("seven","7n")
            .replaceAll("eight","e8t")
            .replaceAll("nine","n9e")
            ).map(m => m.replace(/\D/g,'').split(""));
    
    let sums = nums.map(m => parseInt(_.head(m)+_.last(m)))

    console.log(`star${star}: ${_.sum(sums)}`)

    // let dict = {
    //     "1":"1",
    //     "2":"2",
    //     "3":"3",
    //     "4":"4",
    //     "5":"5",
    //     "6":"6",
    //     "7":"7",
    //     "8":"8",
    //     "9":"9",
    //     "one":"1",
    //     "two":"2",
    //     "three":"3",
    //     "four":"4",
    //     "five":"5",
    //     "six":"6",
    //     "seven":"7",
    //     "eight":"8",
    //     "nine":"9"
    // }

    // // Look from the left
    // const regex = new RegExp(Object.keys(dict).join('|'));

    // // Look from the right (need to invert the text)
    // const regexReversy = new RegExp(Object.keys(dict).map(m=>reverse(m)).join('|'));

    // let firstPlusLast = inArr.map(m => parseInt(
    //     dict[m.match(regex)[0]] +
    //     dict[reverse((reverse(m).match(regexReversy)[0]))]
    // ))

    // console.log(`star2: ${_.sum(firstPlusLast)}`)
}
