/* eslint-disable prettier/prettier */
/* eslint-disable import/no-anonymous-default-export */
export default `
const getReverseString = (str: string): string => {
    const tempString = str?.split("");
    const reverseString = [];
    for(let i = tempString?.length - 1; i >= 0; i--) {
        reverseString.push(tempString[i]);
    }
    return reverseString.join("");
}

export default getReverseString;
getReverseString("dlroW olleH")
`