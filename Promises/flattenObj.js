const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  },
  f: 4
};

const flatten = (obj, parentKey, result = {}) => {
    for (const key in obj){
        if (!obj.hasOwnProperty(key)) continue;
        const newKey = parentKey ? `${parentKey}.${key}` : key
        const value = obj[key]
        if( typeof value === 'object' && value !== null){
            flatten(value, newKey, result)  
        }else{
            result[newKey] = value  
        }
        


    }
    return result


}


console.log(flatten(obj));