import { Elysia, t } from 'elysia';
import { html } from '@elysiajs/html'

import { User, UsersDatabase } from './users_database.js';
import { Product, ProductsDatabase } from './products_database.ts';

import { indexHtml } from '../pages/index.html.tsx';
import { productsHtml } from '../pages/products.html.tsx';
import { adminHtml } from '../pages/admin.html.tsx';
import { isModuleBody } from 'typescript';

const usersDB = new UsersDatabase();
const productsDB = new ProductsDatabase();
// interface Testype {
//     name: string,
//     category: number
// }
new Elysia()
    .use(html())
    .decorate('header', await Bun.file("./components/header.html").text())
    .decorate('caroussel', await Bun.file("./components/caroussel.html").text())
    .get("/", ({header}) => indexHtml(header)) 
    .get("/admin", () => adminHtml())
    .post("/addNewProduct", ({ body }) => { 
        console.log(`New product ${body.name} added to database`)
        const product = productsDB.addProduct(body as Product)
        console.log(product)
        return product
    }, 
    {
        body: t.Object({
            name: t.String(),
            category: t.Integer(),
            price : t.Number()
        }),

        response: t.Object({
            id : t.Integer(),
            name: t.String(),
            category: t.Integer(),
            price : t.Number()
        })
    })
    .post("/deleteProduct", ({ body }) => { 
        console.log(`Product id=${body.id} deleted from database`)
        productsDB.deleteProduct(body.id)
        return body 
    }, 
    {
        body: t.Object({
            id: t.Integer()
        }),

        response: t.Object({
            id: t.Integer()
        })
    })
    .get("/productsList", () => productsDB.getAllProducts())
    .get("/products", ({header, caroussel}) => productsHtml(header, caroussel))
    .post("/submitRegistration", ({ body }) => { 
        usersDB.addUser(body as User)
        console.log(body)
        return body 
    }, 
    {
        body: t.Object({
            email: t.String(),
            password: t.String()
        }),

        response: t.Object({
            email: t.String(),
            password: t.String()
        })
    })
    .post("/submitLogin", async ({ body }) =>  { 
        console.log(await usersDB.getUserFromEmail(body.email))
        return body 
    }, 
    {
        body: t.Object({
            email: t.String(),
            password: t.String()
        }),

        response: t.Object({
            email: t.String(),
            password: t.String()
        })
    })
    .get("/users", () => usersDB.getAllUsers() )
    .get("/script.js", () => Bun.file("js/script.js").text())
    .get("/admin.js", () => Bun.file("js/admin.js").text())
    .get("/admin.css", () => Bun.file("css/admin.css"))
    .get("/styles.css", () => Bun.file("css/styles.css"))
    .get("/header.css", () => Bun.file("css/header.css"))
    .get("/products.css", () => Bun.file("css/products.css"))
    .get("/caroussel.css", () => Bun.file("css/caroussel.css"))
    .get("/icons/:name", ({ params: { name } }) => Bun.file(`public/icons/${name}`))
     // route to GET a book
    // .post(                                    // route to CREATE a book
    //     "/books",
    //     async ({ db, body }) => {
    //       console.log(body)
    //       const id = (await db.addBook(body)).id
    //       console.log(id)
    //       return { success: true, id };
    //     },
    //     {
    //       schema: {
    //         body: t.Object({
    //           name: t.String(),
    //           author: t.String(),
    //         }),
    //       },
    //     }
    // )
    // .put(
    //     "/books/:id",
    //     ({ db, params, body }) => {
    //       try {
    //         db.updateBook(parseInt(params.id), body) 
    //         return { success: true };
    //       } catch (e) {
    //         return { success: false };
    //       }
    //     },
    //     {
    //       schema: {
    //         body: t.Object({
    //           name: t.String(),
    //           author: t.String(),
    //         }),
    //       },
    //     }
    //   )
    //   .delete("/books/:id", ({ db, params }) => {
    //     try {
    //       db.deleteBook(parseInt(params.id))
    //       return { success: true };
    //     } catch (e) {
    //       return { success: false };
    //     }
    //   })
    .listen(3000);