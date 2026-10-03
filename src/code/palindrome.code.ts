/* eslint-disable prettier/prettier */
/* eslint-disable import/no-anonymous-default-export */
export default `
const isPalindrome = (str: String): string => {
    const tempString = str?.split?.('');
    const reverseString = [];
    for(let i = tempString?.length; i >= 0; i--) {
        reverseString?.push?.(tempString[i]);
    }
    if(str === reverseString?.join?.('')){
        return 'Palindrome';
    }
    return 'Not Palindrome';
}

export default isPalindrome;
isPalindrome('RAR')
isPalindrome('dlroW olleH')
`