import { re } from "mathjs";
import {getInput} from "../../getinput.js";
import _ from "lodash";
// import math from 'mathjs';

stars(3);

function extractNumbers(str) {
    const numberObjects = [];
    const regex = /\d+/g;
    
    let match;
    while ((match = regex.exec(str)) !== null) {
        const number = parseInt(match[0]);
        const length = match[0].length;
        const startingIndex = match.index;

        const numberObject = {
            number: number,
            length: length,
            startingIndex: startingIndex
        };

        numberObjects.push(numberObject);
    }

    return numberObjects;
}



export async function stars(day) {
    const response = await getInput(day).then((response) => {
        //star1(response.rawData, response.inputArray, 2*day-1)
        star2(response.rawData, response.inputArray, 2*day)
    })
}

var pattern = /[*@#&+=%/$-]/;

export function star1(rawData, inArr, star){
    console.log(inArr.length)

    let lines = inArr.map(m => m)
    console.log(lines)

    let numbers = lines.map(m => extractNumbers(m))
    console.log(numbers)

    let parts = [];
        numbers.forEach((row,rowNum) => {
            row.forEach(num => {
                let partNum = undefined;
                 // check previous row from index - 1 through index + length
                 let stringToCheck
                 const begin = num.startingIndex - 1 > -1 ? num.startingIndex - 1 : 0
                 if (rowNum>0){
                    console.log(lines[rowNum-1])
                    
                    stringToCheck = lines[rowNum-1].slice(begin, num.startingIndex + num.length + 1)
                    if (pattern.test(stringToCheck)){
                        partNum = num.number
                    }
                 }
                
                // check current row index - 1  and index + length
                stringToCheck = lines[rowNum].slice(begin, num.startingIndex + num.length + 1)
                if (pattern.test(stringToCheck)){
                    partNum = num.number
                }

                // check next row from index - 1 through index + length
                if (rowNum < 139){
                    stringToCheck = lines[rowNum+1].slice(begin, num.startingIndex + num.length + 1)
                    if (pattern.test(stringToCheck)){
                        partNum = num.number
                    }
                }
                if (partNum){
                    parts.push(partNum)
                }
            })
        })
        console.log(_.sum(parts))
       
    }
   

function groupByWithCountIgnoringThird(arr) {
    return arr.reduce((result, [first, second]) => {
        const key = JSON.stringify([first, second]); // Convert the first two elements to a string for unique grouping
        result[key] = (result[key] || 0) + 1; // Count occurrences of each unique sub-array
        return result;
    }, {});
}

export function star2(rawData, inArr, star){
    console.log(inArr.length)

    let lines = inArr.map(m => m)

    let numbers = lines.map(m => extractNumbers(m))

    let coords = [];
        numbers.forEach((row,rowNum) => {
            row.forEach(num => {
                let partNum = undefined;
                 // check previous row from index - 1 through index + length
                 let stringToCheck
                 const begin = num.startingIndex - 1 > -1 ? num.startingIndex - 1 : 0
                 if (rowNum>0){
                    //console.log(lines[rowNum-1])
                    
                    stringToCheck = lines[rowNum-1].slice(begin, num.startingIndex + num.length + 1)
                    const location = stringToCheck.indexOf("*")
                    if (location != -1){
                        coords.push([location+begin,rowNum-1,num.number])
                    }
                 }
                
                // check current row index - 1  and index + length
                stringToCheck = lines[rowNum].slice(begin, num.startingIndex + num.length + 1)
                const location = stringToCheck.indexOf("*")
                if (location != -1){
                    coords.push([location+begin,rowNum,num.number])
                }

                // check next row from index - 1 through index + length
                if (rowNum < 139){
                    stringToCheck = lines[rowNum+1].slice(begin, num.startingIndex + num.length + 1)
                    const location = stringToCheck.indexOf("*")
                    if (location != -1){
                        coords.push([location+begin,rowNum+1,num.number])
                    }
                }
                
            })
        })

        var grouped = groupByWithCountIgnoringThird(coords);
        var resultArray = Object.entries(grouped).map(([key, count]) => _.flattenDeep([JSON.parse(key),count]));
        console.log(resultArray)
        const gearCoords = resultArray.filter(f => f[2] == 2)


        let gearRatios = []
        gearCoords.forEach(gearCoord =>{
            const partsOfGear = coords.filter(f => f[0] == gearCoord[0] && f[1]== gearCoord[1])
            //console.log(partsOfGear)
            gearRatios.push(partsOfGear[0][2]*partsOfGear[1][2])
        })
        
        console.log(_.sum(gearRatios))
    }

