const store = []

const rateLimit = (req, res, next) => {
    try {
        const ip = req.ip;
        const currentTime = Date.now();
        if(!store[ip]){
            store[ip] = {
                count: 1,
                startTime: currentTime
            }
            return next();
        }

        
        const timeElapsed = currentTime - store[ip].startTime

        if(timeElapsed > TimeLimit){
            store[ip] = {
                count: 1,
                startTime: currentTime
            } 
        }else if(store[ip].count > RequestLimit){
            return res.status(429).json({message: "Too many requests. Please try again later."})
        }

        store[ip].count += 1;
        next()
    } catch (error) {
        
    }
} 