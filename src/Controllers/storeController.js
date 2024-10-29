import { productService } from "../Arquitecture/Products/ProductService.js"
import { ProductDAO } from "../DB/DAO.js"


export async function getProducts(req, res){ 
    try{
    const productList = await productService.getProducts()
    res.status(200).json(productList)
    }catch(error){ 
        res.status(400).json({error: error.message})
    }

}

export async function addProduct(req, res){ 
    try{
    const { body } = req
    await productService.addProduct(body)
    res.status(201).json(body)
    }catch(error){ 
        res.status(400).json({error: error.message})
    }

    
}

export async function getProductById({params}, res){ 
    try{
    const product = await productService.getProductById(params.id)
    product ? res.status(200).json(product) : res.status(400).json({message: "Product Not Found"});
    }catch(error){ 
        res.status(400).json({error: error.message})
    }

    
}

export async function updateProduct(req, res){ 
    const id = req.params.id;
    const { body } = req;

    try{
    await productService.updateProduct(id, body)
    res.status(200).json('product updated successfully')
    }catch(error){ 
        res.status(400).json({error: error.message})
    }

}

export async function deleteProduct(req, res){ 
    try{
    await productService.removeProduct(req.params.id)
    res.status(200).json('product deleted successfully')
    }catch(error){ 
        res.status(400).json({error: error.message})
    }

}

export async function searchProducts(req, res){ 
    
    const q = req.query
    
    try{ 
        const productResult = await productService.search(q)
        res.status(200).json(productResult)
    }catch(error){ 
        res.status(400).json({error: error.message})
    }

    
}