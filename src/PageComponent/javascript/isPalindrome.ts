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