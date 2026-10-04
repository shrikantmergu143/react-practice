export default `
const PrimeNumber = (number: number) => {
    if(number <= 1) return false;
    for (let i = 2; i < number; i++){
        if(i % 2 == 0) return false;
    }
    return true;
}

const isPrimeNumber = (num: number) =>{
    const isPrime = PrimeNumber(num);
    if(isPrime) return 'Prime number = {num}';
    return 'Prime not a number = {num}';
}

export {PrimeNumber, isPrimeNumber};

`;