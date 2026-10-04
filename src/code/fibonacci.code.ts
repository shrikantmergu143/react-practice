/* eslint-disable prettier/prettier */
/* eslint-disable import/no-anonymous-default-export */
export default `
export default function getFibonacci(n: number) {
    let a = 0, b = 1;
    let result = [];
    for(let i = 0; i < n; i++){
        result.push(a);
        const current = a + b;
        a = b;
        b = current;
    }

    return result.join(", ");
}

getFibonacci(10);
`;
