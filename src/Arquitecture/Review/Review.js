class Review { 
    #id
    #userId
    #rating
    #comment
    #productId
    #createdAt
    constructor({ id, userId, rating, comment, productId, createdAt }){ 
        this.#id = id; 
        this.#userId = userId; 
        this.#rating = rating; 
        this.#comment = comment; 
        this.#productId = productId; 
        this.#createdAt = createdAt
    }

    asDTO(){ 
        return Object.freeze({ 
            id: this.#id, 
            userId: this.#userId, 
            rating: this.#rating, 
            comment: this.#comment, 
            productId: this.#productId, 
            createdAt: this.#createdAt
        })
    }
}

