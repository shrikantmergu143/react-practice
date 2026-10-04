export default `
const largestNumber = (ar: number[]): number => {
    let largeValue = ar?.[0];
    for (const num of ar) {
        if(num > largeValue){
            largeValue = num;
        }
    }
    return largeValue;
}

export default largestNumber;
<p>{largestNumber([2, 3, 5, 6, 22, 33, 22])}</p>
`