import {helper} from "./day05"

test('true should equal true', () => {
    // let test = [
    //     [50, 98, 2],
    //     [52, 50, 48]
    // ]

    const result = helper(50, 98, 2, 79)
    console.log(result);
    const result2 = helper(52, 50, 48, result)
    console.log(result2)
    // expect(result).toEqual({'98':50,'99':51});
});