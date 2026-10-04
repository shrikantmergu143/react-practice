interface Array<T> {
    ArrayMap(
        callback: (value: T, index: number, array: T[]) => any
    ): any[];
}
Array.prototype.ArrayMap = function (callback: any):any[] {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
}

const numbers = [1,2,3,4,5,6,7,8,9];
console.log(numbers.ArrayMap(i => i *2))