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