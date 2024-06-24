
![TechBanner](https://github.com/JorgeAndresMora8/TechStoreBackend/assets/152979555/7ef35c12-22df-4afb-9f14-16dd6e129cc0)


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


![README](https://github.com/JorgeAndresMora8/TechStoreBackend/assets/152979555/aaf54d85-972e-4bb2-8126-b709b5db847e)


A continuacion se especifica cada una de sus respectivas capas y que funcion cumple cada una. 

#### Routing
El enrutamiento en una API REST se refiere al proceso de dirigir las solicitudes entrantes a los endpoints correspondientes en el servidor para que puedan ser procesadas. En el contexto de una API REST, los endpoints son los recursos o acciones disponibles que se pueden solicitar mediante distintos métodos HTTP (GET, POST, PUT, DELETE, etc.).

```
app.use('/store', storeRouter)
app.use('/review',  reviewRouter)
app.use('/auth', authRouter)
app.use('/user',  userRouter)
app.use('/payment', paymentRouter)
```

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


## Endpoints
A continuacion se muestran algunos endpoints de este proyecto

### 1. Obtener todos los productos

- **URL:** `/products`
- **Método HTTP:** GET
- **Descripción:** Devuelve una lista de todos los productos registrados en el sistema.
- **Parámetros de consulta:** Ninguno
- **Respuesta exitosa (código 200):** JSON con la lista de productos.
- **Ejemplo de respuesta:**
  ```json
  [
    {
        "id": "88b446fd-f100-423f-b6c5-eff8d1af0452",
        "name": "Macbook Air M1",
        "description": "The MacBook Air is a line of laptop computers developed and manufactured by Apple since 2008. It features a thin, light structure in a machined aluminum case and currently either a 13-inch",
        "price": 1200,
        "stock": 40,
        "category": "computer",
        "brand": "apple",
        "image": "https://th.bing.com/th/id/OIP.RcSHJM6SZDh20yKIU-RUhwAAAA?rs=1&pid=ImgDetMain",
        "rating": 4
    },
    {
        "id": "62d15c67-87ab-49ef-ac62-2190a7a1f1c6",
        "name": "Play Station 5",
        "description": "The PS5: Sony's cutting-edge gaming console, boasting lightning-fast SSD, 4K graphics, adaptive triggers, and immersive 3D audio, redefining next-gen gaming.",
        "price": 500,
        "stock": 24,
        "category": "videogame",
        "brand": "sony",
        "image": "https://th.bing.com/th/id/R.05ddb982b067a81f774f3b42bcc5255c?rik=JLtZtyCDAG1KWg&pid=ImgRaw&r=0",
        "rating": 5
    }
  ]

### 2. Finalizacion de la compra

- **URL:** `/payment`
- **Método HTTP:** POST
- **Descripción:** Se realiza la compra sobre los productos seleccionados.
- **Parámetros de consulta:** Ninguno
- **Respuesta exitosa (código 200):** JSON con informacion de la compra y se envia un correo de confirmacion al usuario notificando el proceso exitoso. 
- **Ejemplo de respuesta:**
  ```json
  {
    "message": "purchase succesfully",
    "description": "products selected was bought succesfully",
    "status": true
  }

![Screenshot (94)](https://github.com/JorgeAndresMora8/TechStoreBackend/assets/152979555/1ccc0b42-e220-47aa-96d6-b497a347a7e6)



### 3. Autenticacion Usuario

- **URL:** `/auth/login`
- **Método HTTP:** POST
- **Descripción:** Devuelve informacion del usuario, token, y role del usuario
- **Parámetros de consulta:** Ninguno
- **Respuesta exitosa (código 200):** JSON con informacion del usuario.
- **Ejemplo de respuesta:**
  ```json
  {
    "user": {
        "id": "4",
        "firstname": "daniel@gmail.com",
        "lastname": "lopez",
        "email": "daniel@gmail.com",
        "password": "$2b$08$8bptysF3PitCT1o25axzGu7euE2JNxBCoieJ.S8ZCJBsw4SYJcqKW"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbEBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNTgxMDcsImV4cCI6MTcxNzM0ODEwN30.e4RDUycR6iiiIqpt0ePWnEUKa8FVQWL01xcLA8d6css",
    "admin": false
}

![JWT AUTHENTICATION](https://github.com/JorgeAndresMora8/TechStoreBackend/assets/152979555/7addd78f-faf3-460f-97f1-8880b0b0dc49)
## Proceso Autenticacion Del Usuario

El proceso de autenticación JWT (JSON Web Token) implica los siguientes pasos:

### Inicio de sesión 
El usuario envía sus credenciales al servidor (en este proyecto se usa email y contraseña) a través de un formulario de inicio de sesión.
```
{ 
            "email": "jorgemora@gmail.com",
            "password": "1#je]20f8h2"
}
```

### Autenticación 
El servidor verifica las credenciales del usuario. Si son válidas, el servidor genera un JWT que contiene información sobre la identidad del usuario y rol en el sistema.
```
export async function login(req, res){ 

    try{ 
    const user = await loginValidation(req.body)
    const token = await createToken(req.body)
    SendResponse(res, 200, {user: user, token: token, admin: false})
    } catch(error){ 
    SendResponse(res, 401, {error: error.message})
    }

}
```

### Generación del JWT 
El servidor firma el JWT utilizando una palabra secreta que se encuentra en el sistema. El JWT tiene una estructura de tres partes: el encabezado, el cuerpo y la firma. El encabezado contiene el tipo de token y el algoritmo de firma utilizado. El cuerpo (payload) contiene los datos del usuario y cualquier otra información relevante. La firma protege la integridad del token y garantiza que no haya sido alterado.
```
import jwt from "jsonwebtoken"
import { SECRET_WORD_ENV } from "../envData/Env"

export default async function createToken(data){ 
    const { email } = data
    const token = await jwt.sign({email: email}, SECRET_WORD_ENV, { expiresIn:60*60*25 })
    return token
}
```

Ejemplo de un token:
```
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbEBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNTgxMDcsImV4cCI6MTcxNzM0ODEwN30.e4RDUycR6iiiIqpt0ePWnEUKa8FVQWL01xcLA8d6css",
}
```

### Envío del JWT al cliente
El servidor envía el JWT al cliente, en la solicitud de inicio de sesión. El cliente almacena el JWT, en el local storage del browser.
```
  {
    "user": {
        "id": "4",
        "firstname": "Jorge",
        "lastname": "Mora",
        "email": "jorgemora@gmail.com",
        "password": "$2b$08$8bptysF3PitCT1o25axzGu7euE2JNxBCoieJ.S8ZCJBsw4SYJcqKW"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmllbEBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNTgxMDcsImV4cCI6MTcxNzM0ODEwN30.e4RDUycR6iiiIqpt0ePWnEUKa8FVQWL01xcLA8d6css",
    "admin": true
}
```

### Inclusión del JWT en las solicitudes posteriores 
El cliente incluye el JWT en las solicitudes posteriores al servidor, en el header de las solicitudes.

### Verificación del JWT
El servidor verifica la firma del JWT para asegurarse de que no ha sido manipulado y valida su contenido. Si el JWT es válido y no ha caducado, el servidor procesa la solicitud y responde exitosamente.


## Persistencia
![mongodb2](https://github.com/JorgeAndresMora8/TechStoreBackend/assets/152979555/f5bcde41-a6fd-4745-840a-2d8cbcfbd883)


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
### Información de Contacto

Si tienes preguntas, comentarios o sugerencias sobre este proyecto, no dudes en ponerte en contacto conmigo. Estoy disponible a través de los siguientes medios:

- **Correo Electrónico:** jamm08012002@gmail.com || jorgeandresmora.developer@gmail.com
- **LinkedIn:** [@Jorge Andres Mora](https://www.linkedin.com/in/jorge-andres-mora/)
