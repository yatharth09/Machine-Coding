// import { create } from "node:domain";

// const cart = ['apple', 'banana', 'orange'];


// const callback = function() {
//     console.log('Order has been created for:', cart);
// }
// const createOrder = function(cart, callback);

const user = fetch('https://jsonplaceholder.typicode.com/users/1')
user.then((data) => console.log(data))



function promisePolyfill(executor){

    let onResolve;
    let onReject;
    let val
    let onFulfilled = false
    let called = false

    this.catch = function(cb){
        
        onReject = cb
        return this
    }

    const resolve = (value) => {

        onFulfilled = true
        val = value

        if(typeof onResolve == 'function'){
            onResolve(value)
            called = true

        }

    }

    const reject = (value) => {
        onReject(value)
    }
    


    this.then = function(cb){
        onResolve = cb

        if(onFulfilled && !called){
            called = true
            onResolve(val)
        }

        return this
    }

    try {
        executor(resolve, reject)
    } catch (error) {
        reject(error)
    }
    
}

const obj = new promisePolyfill((resolve, reject) => {
    
        resolve(3)
   
})

obj.then((data) => {
    console.log(data)
})


Promise.prototype.myAll = function(promises){
    return new Promise((resolve, reject) => {
        let pending = promises.length
        let res = []

        if(pending === 0){
            return 
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((data) => {
                res[index] = data
                pending--

                if(pending === 0){
                    resolve(res)
                }
            }, reject)
        })
    })
}