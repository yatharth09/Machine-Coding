//implement a class promiseExecutor which accepts an array of function and returns promise and executes all the promise concurrently 
// it stores the result of the promises when they resolve or reject For each rejected promise, it should support an exponential 
// backoff system, which retries the same rejected promise at exponential increasing time intervals

class PromiseExecutor {
    constructor(func, delay, retries){
        this.func = func
        this.delay = delay
        this.retries = retries
        this.results = []
    }

    run() {
        return new Promise((resolve, reject) => {
            let pending = this.func.length
            this.func.forEach((fn, index) => {
                this.runWithRetries(fn, 0, index)
                    .then(() => {
                        pending--
                        if (pending === 0) {
                            resolve(this.results)
                        }

                    })
            })
     
        })
    }



    runWithRetries(fn, attempts = 0, index) {
        return fn()
            .then(res => {
            this.results[index] = {
                message: 'Success',
                data: res,
                attempts: attempts + 1
            };
            return this.results[index];
            })
            .catch(err => {
            if (attempts == this.retries - 1) {
                this.results[index] = {
                message: 'Failed',
                error: err,
                attempts: attempts + 1
                };
                return this.results[index];
            }

            const delay = this.delay * Math.pow(2, attempts);
            return this.sleep(delay)
                .then(() => this.runWithRetries(fn, attempts + 1, index));
            });
        }


    
    sleep(ms){
        return new Promise((resolve) => setTimeout(resolve, ms))
    }


}

const tasks = [
  () => Promise.resolve("API success"),
  () => Promise.reject("Network error"),
  () =>
    new Promise((resolve, reject) =>
      Math.random() > 0.7 ? resolve("Eventually works") : reject("Flaky")
    )
];
const executor = new PromiseExecutor(tasks, 1000, 3)

executor.run().then(() => {
    console.log(executor.results)
}).catch(err => {
    console.error("Error:", err)
})





