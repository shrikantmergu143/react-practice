const getReverseString = (str: string): string => {
    const tempString = str?.split("");
    const reverseString = [];
    for(let i = tempString?.length - 1; i >= 0; i--) {
        reverseString.push(tempString[i]);
    }
    return reverseString.join("");
}

export default getReverseString