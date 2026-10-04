const duplicateValueRemove = (Arr: any) => {
    const tempArr: any = [];
    for ( const item of Arr) {
        if(!tempArr.includes(item)){
            tempArr.push(item);
        }
    }
    return tempArr;
}

export default duplicateValueRemove;