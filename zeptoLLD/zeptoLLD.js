class Product {
    constructor(id, name, price) {
        this.pid = id
        this.name = name
        this.price = price
    }

    getProId = () => {
        return this.pid
    }

    getProName = () => {
        return this.name
    }

    getProPrice = () => {
        return this.price
    }

}

class ProductFactory {
    constructor(){
        
    }
}