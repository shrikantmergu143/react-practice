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
export function getNthFibonacci(n: number): any {
    if(n <= 1) return n;

    return getNthFibonacci(n - 1) + getNthFibonacci(n - 2);
}