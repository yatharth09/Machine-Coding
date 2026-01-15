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
        return val

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