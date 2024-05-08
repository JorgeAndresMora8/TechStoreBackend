export default class Product { 
    #id
    #firstname
    #lastname
    #email
    #password
    constructor({id, firstname, lastname, email, password}){ 
        this.#id = id; 
        this.#firstname = firstname; 
        this.#lastname = lastname; 
        this.#email = email; 
        this.#password = password
    }

    asDTO(){ 
        return Object.freeze({ 
            id: this.#id, 
            firstname: this.#firstname, 
            lastname: this.#lastname, 
            email: this.#email, 
            password: this.#password
        })
    }
}