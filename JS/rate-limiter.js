// 1️⃣ Implement a Fixed Window Rate Limiter
// ❓ Question

// Allow N requests per T milliseconds per user.
// Reject requests beyond the limit.

// 🧠 Idea

// Bucket requests into fixed time windows

// Reset counter when window expires

// Simple but has edge-case bursts

class RateLimiter {
    constructor(limit, windowms){
        this.limit = limit
        this.windowms = windowms
        this.mp = new Map()
    }

    run(userId){
        const currentTime = Date.now()
        const entry = this.mp.get(userId)
        if(!entry || currentTime - entry.startTime >= this.windowms){
            this.mp.set(userId, {count: 1, startTime: currentTime})
            return true
        }else{
            if(entry.count < this.limit){
                entry.count++
                return true
            }
        }

        return false
    }
}


// 2️⃣ Implement a Sliding Window Rate Limiter
// ❓ Question

// Improve fixed window so that bursts at window edges are smoothed.

// 🧠 Idea

// Store timestamps of requests

// Remove expired ones

// Accurate but memory heavy

class slidingWindowRateLimiter {
    constructor(limit, windowms){
        this.limit = limit
        this.windowms = windowms
        this.mp = new Map()
    }

    approve(userId){
        const time = new Date()
        const startTime = time - this.windowms
        if(!this.mp.has(userId)){
            this.mp.set(userId, [])
        }

        const timeStamps = this.mp.get(userId)

        while(timeStamps.length && timeStamps[0] < startTime){
            timeStamps.shift()
        }

        if(timeStamps.length < this.limit){
            timeStamps.push(time)
            return true
        }

        return false
    }
}


// 3️⃣ Implement a Token Bucket Rate Limiter (Very Popular)
// ❓ Question

// Allow requests at a steady rate with short bursts.

// 🧠 Idea

// Tokens refill over time

// Each request consumes one token

// Industry favorite

class tokenRateLimiter {
    constructor(capacity, refillRatePerSecond){
        this.capacity = capacity
        this.refillRate = refillRatePerSecond
        this.mp = new Map()
    }

    allow(userId){
        const time = new Date()
        if(!this.mp.has(userId)){
            this.mp.set(userId, {
                tokens: this.capacity - 1,
                lastTime: time
            })
            return true
        }

        const obj = this.mp.get(userId)

        const elapsed = time - obj.lastTime
        
        const newTokens = this.refillRate * Number(elapsed/1000)

        obj.tokens = (obj.tokens + newTokens) > this.capacity ? this.capacity: obj.tokens + newTokens
        obj.lastTime = time
        

        if(obj.tokens >= 1){
            obj.tokens -= 1
            return true
        }

        return false


    }
}

