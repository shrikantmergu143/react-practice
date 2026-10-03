const getFactorial = (num: number): number => {
    if(num == 0) return 1;
    return num * getFactorial(num - 1);
}

export default getFactorial;