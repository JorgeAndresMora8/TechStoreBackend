import { ProductDAO } from "../../DB/DAO.js";


class ProductRepository { 
    constructor(DAO){ 
        this.DAO = DAO;
    }

    async getProducts(){ 
        const productList = await this.DAO.get_all(); 
        return productList
    }

    async getProductById(id){ 
        const product = await this.DAO.get_by_id(id); 
        return product
    }

    async addProduct(data){
        await this.DAO.create(data) 
    }

    async deleteProduct(id){ 
        await this.DAO.delete(id)
    }

    async updateProduct(id, data){ 
        await this.DAO.update(id, data)
    }

    async search(query){ 
        const result = await this.DAO.get_by_params(query)
        return result
    }
}


export const productRepository = new ProductRepository(ProductDAO)