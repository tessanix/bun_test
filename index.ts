import { Elysia, t } from 'elysia';
import { html } from '@elysiajs/html'
import { User, UsersDatabase } from './users_database.js';
import { indexHtml } from './index.html.tsx';
import { productsHtml } from './products.html.tsx';

const db = new UsersDatabase();

new Elysia()
    .use(html())
    .decorate('header', await Bun.file("./header.html").text())
    .get("/", ({header}) => indexHtml(header)) 
    .get("/products", ({header}) => productsHtml(header))
    // .get("/registrationForm", () => Bun.file("registrationForm.html").text())
    .post("/submitRegistration", ({ body }) => { 
        db.addUser(body as User)
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
        console.log(await db.getUserFromEmail(body.email))
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
    .get("/allUsers", () =>  db.getAllUsers() )
    .get("/script.js", () => Bun.file("script.js").text())
    .get("/styles.css", () => Bun.file("styles.css"))
    .get("/icons/:name", ({ params: { name } }) => Bun.file(`public/icons/${name}`))
    // .get("/books", ({ db }) => db.getBooks()) // route to GET a book
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