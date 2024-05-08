import createId from "../../utils/createId.js";
import { productRepository } from "./ProductRepository.js"

class ProductService { 
    constructor(repository){ 
        this.repository = repository
    }

    async getProducts(){ 
        const productList = await this.repository.getProducts(); 
        return productList
    }

    async getProductById(id){ 
        const product = await this.repository.getProductById(id); 
        return product
    }

    async addProduct(data){ 
        data['id'] = createId()
        await this.repository.addProduct(data)
    }

    async updateProduct(id, data){ 
        const productUpdated = await this.repository.updateProduct(id, data)
        return productUpdated
    }

    async removeProduct(id){ 
        await this.repository.deleteProduct(id)
    }

    async search(query){ 
        const productList = await this.repository.search(query)
        return productList
    }
}

export const productService = new ProductService(productRepository)