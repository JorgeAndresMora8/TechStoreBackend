# REST API (Documentacion)
Mediante este documento se explica todo lo relacionado a este proyecto que involucra la creacion de una rest api en Node Js, empleando el framework de express.js. Es importante saber que en caso de querer clonar
y usar este proyecto es necesario establencer configuraciones extras tales como Google Password Keys, Modelos en Mongodb y demas. 

## Descripcion
TechStore es un ecommerce donde ofrecemos productos tecnologicos, contando con las mejores marcas del mercado a precios accesibles para todas las personas. A continuacion se explicara 
la instalacion, casos de uso y arquitectura empleada para la construccion de este proyecto. 

### Paquetes 
A continuacion se especifican los paquetes empleados en el proyecto.

#### Dependencias
```javascript
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.10",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "log4js": "^6.9.1",
    "minimist": "^1.2.8",
    "mongoose": "^8.3.2",
    "nodemailer": "^6.9.13",
    "uuid": "^9.0.1"
```

#### Dev Dependencias
```
"nodemon": "^3.1.0"
```

Al momento de clonar el repositorio por medio del link : http://localhost:8080/store, correr el siguiente comando para instalar los parquetes requeridos: 
```
npm i
```
## Arquitectura 
En este proyecto se empleo la arquitectura __SOLID.__, que cumple con el objetivo de establecer una construccion optima, escalable y organizada siguiendo la premisa de  __SINGLE RESPONSABILITY PRINCIPLE.__, 
que se traduce principalmente en construir nuestra API en forma de capas y a su vez cada capa se encargue de realizar una tarea en especifico, esto ayuda a crear modulos de codigos mas escalables, mantenibles y de facil manejo. 


A continuacion se especifica cada una de sus respectivas capas y que funcion cumple cada una. 

#### Capa Controller
La capa de controlador en una API REST es responsable de manejar las solicitudes HTTP entrantes, interpretarlas y orquestar la lógica de negocio correspondiente. 
Su función principal es recibir las solicitudes del cliente, extraer los datos necesarios de esas solicitudes (como parámetros de ruta, consultas, cuerpo de solicitud, 
encabezados, etc.), y luego llamar a los servicios adecuados para llevar a cabo las operaciones requeridas.
```
export async function getProducts(req, res){ 
    try{
    const productList = await productService.getProducts()
    res.status(200).json(productList)
    }catch(error){ 
        res.status(400).json({error: error.message})
    }

}
```

#### Capa de Servicio
La capa de servicio contiene la lógica de negocio de la aplicación. Su función principal es implementar la lógica y los algoritmos 
necesarios para realizar las operaciones requeridas por la aplicación. Esto puede incluir la validación de datos, el procesamiento 
de datos, la coordinación de diferentes operaciones, la gestión de transacciones, entre otras cosas. Los servicios son invocados por 
los controladores para realizar operaciones específicas en respuesta a las solicitudes del cliente.

Ejemplo a continuacion: 

```
class ProductService { 
    constructor(repository){ 
        this.repository = repository
    }

    async getProducts(){ 
        const productList = await this.repository.getProducts(); 
        return productList
    }

    async addProduct(data){ 
        data['id'] = createId()
        await this.repository.addProduct(data)
    }

    async updateProduct(id, data){ 
        const productUpdated = await this.repository.updateProduct(id, data)
        return productUpdated
    }
}
```

#### Capa Repository
La capa de repositorio (también conocida como capa de acceso a datos) se encarga de interactuar con la capa de almacenamiento de datos subyacente, 
como una base de datos o cualquier otro mecanismo de persistencia. Su función es abstractar y encapsular las operaciones de acceso a datos, 
proporcionando una interfaz para realizar operaciones CRUD (crear, leer, actualizar y eliminar) en la base de datos. Los repositorios son invocados 
por los servicios para realizar operaciones de lectura y escritura en la base de datos.

Ejemplo a continuacion: 
```

class ProductRepository { 
    constructor(DAO){ 
        this.DAO = DAO;
    }

    async getProducts(){ 
        const productList = await this.DAO.get_all(); 
        return productList
    }

    async addProduct(data){
        await this.DAO.create(data) 
    }
}
```

#### Capa DAO
La capa de DAO es una capa de acceso a datos más baja que generalmente se encuentra dentro de la capa de repositorio. Su función es proporcionar métodos 
para realizar operaciones específicas en la base de datos, como ejecutar consultas SQL, insertar filas, actualizar datos, eliminar registros, etc. Los DAOs 
encapsulan la lógica específica de la base de datos y proporcionan una interfaz para interactuar con ella. Los repositorios suelen utilizar los DAOs internamente 
para realizar operaciones de acceso a datos en la base de datos.
```

export default class Container { 
    constructor(schema){ 
        this.schema = schema; 
    }

    async get_all(){ 
        return await this.schema.find({}, {_id: 0, __v: 0}).lean();
    }

    async get_by_id(id){ 
        const data = await this.schema.findOne({id: id}, {_id: 0, __v: 0})
        return data
    }

    async get_by_email(email){ 
        const data = await this.schema.findOne({email: email}, {_id: 0, __v: 0})
        return data 
    }

    async update(id, data){ 
        const { name, description, stock, price, rating } = data
        await this.schema.updateOne({id:id}, {$set:{name, price, stock, description, rating}})
    }
}
```


## Persistencia
En este proyecto se empleo MongoDB como base de datos en este proyecto. MongoDB ofrece modelado flexible de datos, 
escalabilidad horizontal y vertical, alto rendimiento, replicación para alta disponibilidad, consultas ricas y flexibles, 
y es ideal para aplicaciones web modernas y grandes volúmenes de datos.

Para emplearlo en nuestro proyecto se empleo Mongoose. Es una biblioteca de modelado de datos para MongoDB en Node.js. Proporciona una solución elegante para organizar y estructurar los datos de una aplicación Node.js

A continuacion se muestran aspectos importantes del uso de esta biblioteca en el proyecto. 

#### Creacion De Modelo
```
import { Schema, model } from "mongoose";

const productSchema = new Schema({ 
    id: { type: String, required: true }, 
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true}, 
    image: { type: String, required: true}, 
    rating: { type: Number, required: true }
})

export const productModel = new model('products', productSchema)
```

#### Conexion a DB
```
import mongoose from 'mongoose';

export default function DBConnection(URI){ 
    try{ 
        mongoose.connect(URI)
    }catch(error){ 
        setTimeout(() => {
            DBConnection(URI)
        }, 5000);
    }
}
```
