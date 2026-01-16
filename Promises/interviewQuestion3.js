// Question 2: Implement Retry with Exponential Backoff (No async/await)
// ❓ Problem Statement

// Implement retry(fn, options) that:

// Accepts a function returning a promise

// Retries on failure

// Uses exponential backoff

// Rejects after max retries


class RetryExecutor {
    constructor(fn, maxRetries, delay){
        this.fn = fn
        this.maxRetries = maxRetries
        this.delay = delay
    }

    run(){
        function attempt(fn, retriesLeft, delay){
            return fn().catch(err => {
                if(retriesLeft === 0){
                    return Promise.reject(err)
                }

                

                return new Promise((resolve) => {setTimeout(resolve, delay)}).then(() => {
                    return attempt(fn, retriesLeft - 1, delay * 2)
                })
            })

            
        }
        attempt(this.fn, this.maxRetries, this.delay)
    }
}
