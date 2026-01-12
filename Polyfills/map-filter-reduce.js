
Array.prototype.myMap = function(cb) {
    const res = []
    for(let i = 0 ; i < this.length; i++){
        const ele = this[i]
        res.push(cb(ele, i, this))
    }

    return res
}


Array.prototype.myFilter = function(cb) {
    const res = []
    for(let i = 0; i < this.length; i++){
        if(cb(this[i], i, this)){
            res.push(this[i])
        }
    }

    return res
}

Array.prototype.myReduce = function(cb, initialValue) {
    let acc = initialValue
    for(let i = 0; i < this.length; i++){
        acc = acc? cb(acc, this[i], i, this) : this[i]
    }
    return acc
}


const nums = [1,2,3,4,5]

const sum = nums.myReduce((acc, num) => {acc + num}, 0)

const double = nums.myMap(num => num*2)

const even = nums.myFilter(num => num %2 == 0)

console.log(sum, double, even)