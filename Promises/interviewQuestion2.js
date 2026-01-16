// Implement a Concurrency-Limited Promise Pool
// Implement a class PromisePool that:
//  Accepts:
//  An array of functions returning promises
//  A max concurrency limit
//  Executes promises in parallel but never exceeding the limit
//  Preserves input order in results
//  Returns a promise that resolves with all results
//  Stops execution if any promise rejects


class ConcurrencyLimitedPromisePool {
    constructor(funcs, limit){
        this.funcs = funcs
        this.limit = limit
        this.index = 0
        this.results = []
    }

    run() {
        return new Promise((res, rej) => {
            let pending = (this.limit < this.funcs.length) ? this.limit : this.funcs.length
            this.funcs.forEach((fn, index) => {
                fn().then((data) => {
                    this.results[index] = data
                    pending--
                    if(pending === 0){
                        this.index = this.limit
                        res(this.results)
                    }
                }).catch((err) => {rej(err)})
            })
        })
    }

}

const tasks = []

const executor = new ConcurrencyLimitedPromisePool(tasks, 3)

