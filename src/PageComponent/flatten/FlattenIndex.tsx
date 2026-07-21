/* eslint-disable prettier/prettier */
/* eslint-disable array-callback-return */
import React from 'react'
import BodyLayout from '../Layout/BodyLayout';

export default function FlattenIndex() {
    const array_value = [['foo', 'bar'], ['baz', 'qux']];
    const Array1 = [1, 2, 3, 4, [5, 6, [6, [23,23, 5, 6,5, 6, 7, ["234", 234]], 7], 7, 8]];
    const flatten = (array: any[]) =>{
        const temp: any = [];
        array?.forEach((arrayItem) => {
            if(Array.isArray(arrayItem)){
                temp.push(...flatten(arrayItem));
            } else {
                temp.push(arrayItem);
            }
        });
        return temp;
    };
  return (
    <BodyLayout>
       <p>
        {JSON.stringify(array_value)} {`=>`} {JSON.stringify(flatten(array_value))}
       </p>
       <p>
        {JSON.stringify(Array1)} {`=>`} {JSON.stringify(flatten(Array1))}
       </p>
    </BodyLayout>
  )
}
