class LRU {
    constructor(limit, cache){
        this.limit = limit
        this.cache = cache || new Map()
    }

    get(key){
        if(!this.cache.has(key)) return -1

        const val = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, val)
        return val.value

    }

    put(key, value){
        if(this.cache.has(key)){
            this.cache.delete(key)
        }
        if(this.cache.size === this.limit){
            this.cache.delete(this.cache.keys().next().value)
        }
        this.cache.set(key, value)
        
    }
}


class LRUWithTTL extends LRU {
    constructor(limit, ttlms){
        super(limit)
        this.ttl = ttlms
    }

    get(key){
        const obj = this.cache.get(key)
        if(obj === undefined){
            return -1
        }
        if(Date.now() - obj.timeStamp < this.ttl){
            obj.timeStamp = Date.now()
            return super.get(key)
        }

        this.cache.delete(key)
        return -1
    }

    put(key, value){
        const obj = this.cache.get(key)
        const timeStamp = Date.now()
        if(obj === undefined){
            const newObj = {
                value,
                timeStamp
            }
            return super.put(key, newObj)
            
        }

        obj.timeStamp = timeStamp
        obj.value = value

        return super.put(key, obj)

    }

}