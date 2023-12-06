import {getInput} from "../../getinput.js";
import _ from "lodash";
// import math from 'mathjs';

stars(2);

export async function stars(day) {
    const response = await getInput(day).then((response) => {
        //star1(response.rawData, response.inputArray, 2*day-1)
        star2(response.rawData, response.inputArray, 2*day)
    })
}

export function star1(rawData, inArr, star){
    console.log(inArr)
    let lines = inArr.map(m => m.substring(5))
    .filter(f => (!f.includes(" 13 r") && !f.includes(" 14 r") && !f.includes(" 15 r")&& !f.includes(" 16 r")&& !f.includes(" 17 r")&& !f.includes(" 18 r")&& !f.includes(" 19 r")&& !f.includes(" 20 r") &&
    !f.includes(" 14 g")&& !f.includes(" 15 g")&& !f.includes(" 16 g")&& !f.includes(" 17 g")&& !f.includes(" 18 g")&& !f.includes(" 19 g")&& !f.includes(" 20 g") &&
    !f.includes(" 15 b")&& !f.includes(" 16 b")&& !f.includes(" 17 b")&& !f.includes(" 18 b")&& !f.includes(" 19 b")&& !f.includes(" 20 b"))
    );

    const possible = lines.map(m => Number(m.split(": ")[0]))
    console.log(`star${star}: ${_.sum(poss)}`)
}

export function star2(rawData, inArr, star){
    let lines = inArr.map(m => m.substring(5))
    let games = lines.map(m => m.split(": ")[1])
    let gameRolls = games.map(m => m.split("; ").map(gr => gr.split(", ").map(c => c.split(" "))))

    let summary = gameRolls.map((game,i) => {
        let reds = []
        let blues = []
        let greens = []
        game.forEach(roll => {
            const red = roll.filter(color => {
                return color[1]=='red'
            })
            if(red.length>0)reds.push(Number(red[0][0]))
            const blue = roll.filter(color => {
                return color[1]=='blue'
            })
            if(blue.length>0)blues.push(Number(blue[0][0]))
            const green = roll.filter(color => {
                return color[1]=='green'
            })
            if(green.length>0)greens.push(Number(green[0][0]))
        })

        return {index:i+1,reds:_.max(reds),blues: _.max(blues),greens: _.max(greens)}
    })
    let possible = summary.filter(f=>{
        return f.reds<13 && f.blues<14 && f.greens < 15;
    }).map(m => m.index)

    const powers = summary.map(m => m.reds * m.blues * m.greens)
    console.log(`star${3}: ${_.sum(possible)}`)
    console.log(`star${4}: ${_.sum(powers)}`)
}
