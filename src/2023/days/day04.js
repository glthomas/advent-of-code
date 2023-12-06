import {getInput} from "../../getinput.js";
import _ from "lodash";


export function helper(input){
    return input*2
}

export async function day(day) {
    const response = await getInput(day).then((response) => {
        stars(response.rawData, response.inputArray)
    })
}

export function stars(rawData, lines){
    let numbers = lines.map(m => m.substring(9).split("|"))
    let matches = numbers.map(m => _.intersection(
        m[0].trim().split(/\s+/).map(Number), 
        m[1].trim().split(/\s+/).map(Number)))
    let multiplier = _.fill(Array(lines.length), 1);
    matches.forEach((match,index) => {
        for (let a = 0; a < match.length; a++){
            multiplier[index+1+a] += multiplier[index];
        }
    })
    const scores = matches.map(m => m.length>0? Math.pow(2,m.length-1):0)
    console.log(`star${7}: ${_.sum(scores)}`) 
    console.log(`star${8}: ${_.sum(multiplier)}`) 
}