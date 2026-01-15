const first = new Promise((resolve, reject) => {
    resolve(1)
})

const second = new Promise((resolve, reject) => {
    resolve(first)
})


second.then(res => res).then(res => console.log(res))

function promiseRace(promises){
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise).then(resolve).catch(reject)
        })
    })
}

function retryPromise(fn, retries, delay){
    return new Promise((resolve, reject) => {
       function attempt() {
            fn.then(resolve).catch(err => {
                if(retries === 0){
                    reject(err)
                }else{
                    retries--
                    setTimeout(attempt, delay)
                }
            })
       }

       attempt()
    })
}