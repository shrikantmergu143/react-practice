/* eslint-disable prettier/prettier */
/* eslint-disable import/no-anonymous-default-export */
export default `
const getFactorial = (num: number): number => {
    if(num == 0) return 1;
    return num * getFactorial(num - 1);
}

export default getFactorial;

getFactorial(5);
getFactorial(10);
`