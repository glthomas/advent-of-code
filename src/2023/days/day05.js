import {getInput} from "../../getinput.js";
import _ from "lodash";


export function helper(dest, src, len, seed){
    


    const result = seed >= src && seed <= src + len ? dest + (seed - src) : seed
    //console.log({result})
    return result
    
}



export async function day(day) {
    const response = await getInput(day).then((response) => {
        const bounds = stars(response.rawData, response.inputArray)
        stars2(response.rawData, response.inputArray, bounds)
    })
}

export function stars2(rawData, lines, bounds){
    //console.log(lines)

    let testRaw =
    "seeds: 79 14 55 13\n" +
    "\n" +
    "seed-to-soil map:\n" +
    "50 98 2\n" +
    "52 50 48\n" +
    "\n" +
    "soil-to-fertilizer map:\n" +
    "0 15 37\n" +
    "37 52 2\n" +
    "39 0 15\n" +
    "\n" +
    "fertilizer-to-water map:\n" +
    "49 53 8\n" +
    "0 11 42\n" +
    "42 0 7\n" +
    "57 7 4\n" +
    "\n" +
    "water-to-light map:\n" +
    "88 18 7\n" +
    "18 25 70\n" +
    "\n" +
    "light-to-temperature map:\n" +
    "45 77 23\n" +
    "81 45 19\n" +
    "68 64 13\n" +
    "\n" +
    "temperature-to-humidity map:\n" +
    "0 69 1\n" +
    "1 0 69\n" +
    "\n" +
    "humidity-to-location map:\n" +
    "60 56 37\n" +
    "56 93 4"

    console.log(testRaw)

    let arr = testRaw.split("\n\n");
    //console.log(arr)
    const seeds = arr[0].substring(7).split(" ").map(m => Number(m))
    console.log({bounds})
    console.log({seeds})

    

    const locations = seeds.map(s => {
        let answer = s;
        for (let a = 1; a < arr.length; a++){
            const mapGroup = arr[a].split("\n").slice(1).map(m => m.split(" ").map(n => Number(n)));
            //console.log(mapGroup)
            let mapped = false;
            for (let b = 0; b < mapGroup.length; b++){
                const mapped = helper(mapGroup[b][0],mapGroup[b][1],mapGroup[b][2], answer)
                if (answer != mapped){
                    answer = mapped;
                    b = mapGroup.length;
                }
            }
        }
        return answer;
    })
    



    console.log(locations)

    // //console.log(seeds)
    console.log(`star${9}: ${_.min(locations)}`) 


 
    //console.log(`star${10}: ${_.sum(multiplier)}`) 
}

export function stars(rawData, lines){
    //console.log(lines)

    let testRaw =
    "seeds: 79 14 55 13\n" +
    "\n" +
    "seed-to-soil map:\n" +
    "50 98 2\n" +
    "52 50 48\n" +
    "\n" +
    "soil-to-fertilizer map:\n" +
    "0 15 37\n" +
    "37 52 2\n" +
    "39 0 15\n" +
    "\n" +
    "fertilizer-to-water map:\n" +
    "49 53 8\n" +
    "0 11 42\n" +
    "42 0 7\n" +
    "57 7 4\n" +
    "\n" +
    "water-to-light map:\n" +
    "88 18 7\n" +
    "18 25 70\n" +
    "\n" +
    "light-to-temperature map:\n" +
    "45 77 23\n" +
    "81 45 19\n" +
    "68 64 13\n" +
    "\n" +
    "temperature-to-humidity map:\n" +
    "0 69 1\n" +
    "1 0 69\n" +
    "\n" +
    "humidity-to-location map:\n" +
    "60 56 37\n" +
    "56 93 4\n"

    console.log(testRaw)

    let arr = testRaw.split("\n\n");
    //console.log(arr)
    const seeds = arr[0].substring(7).split(" ").map(m => Number(m))
    //console.log(seeds)

    const seedRanges = []
    let boundaries = []
    for (let c = 0; c < seeds.length/2; c=c+2){
        seedRanges.push([seeds[c],seeds[c+1]])
        boundaries.push(seeds[c])
        boundaries.push(seeds[c]+seeds[c+1]-1)
    }

    console.log(boundaries)
    
    
            for (let a = 1; a < arr.length; a++){
                const mapGroup = arr[a].split("\n").slice(1).map(m => m.split(" ").map(n => Number(n)));
                //console.log(mapGroup)
                let mapped = false;
                for (let b = 0; b < mapGroup.length; b++){
                    //const mapped = helper(mapGroup[b][0],mapGroup[b][1],mapGroup[b][2], answer)
                    const mapGroupStart = mapGroup[b][1]
                    const mapGroupDestStart = mapGroup[b][0]
                    const mapGroupDestEnd = mapGroup[b][0]
                    const mapGroupDestEndPlusOne = mapGroupDestEnd + 1;
                    const mapGroupEnd = mapGroup[b][1]+mapGroup[b][2]-1
                    const mapGroupEndPlusOne = mapGroupEnd + 1;

                    boundaries.push(mapGroupStart)
                    boundaries.push(mapGroupEnd)
                    boundaries.push(mapGroupEndPlusOne)
                    boundaries.push(mapGroupDestStart)
                    boundaries.push(mapGroupDestEnd)
                    boundaries.push(mapGroupDestEndPlusOne)
                    
                }
            }
            
            
            console.log(boundaries)

return boundaries;
    
    



    //  console.log(locations)

    // //console.log(seeds)
    //console.log(`star${9}: ${_.min(locations)}`) 


 
    //console.log(`star${10}: ${_.sum(multiplier)}`) 
}