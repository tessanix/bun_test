import { Elysia, t } from 'elysia';
import { html } from '@elysiajs/html'
import { BooksDatabase } from './db.js';

new Elysia()
    .use(html())
    .decorate('db', new BooksDatabase())
    .get("/", () => Bun.file("index.html").text())
    .get("/script.js", () => Bun.file("script.js").text())
    .get("/styles.css", () => Bun.file("styles.css"))
    .get("/books", ({ db }) => db.getBooks()) // route to GET a book
    .post(                                    // route to CREATE a book
        "/books",
        async ({ db, body }) => {
          console.log(body)
          const id = (await db.addBook(body)).id
          console.log(id)
          return { success: true, id };
        },
        {
          schema: {
            body: t.Object({
              name: t.String(),
              author: t.String(),
            }),
          },
        }
    )
    .put(
        "/books/:id",
        ({ db, params, body }) => {
          try {
            db.updateBook(parseInt(params.id), body) 
            return { success: true };
          } catch (e) {
            return { success: false };
          }
        },
        {
          schema: {
            body: t.Object({
              name: t.String(),
              author: t.String(),
            }),
          },
        }
      )
      .delete("/books/:id", ({ db, params }) => {
        try {
          db.deleteBook(parseInt(params.id))
          return { success: true };
        } catch (e) {
          return { success: false };
        }
      })
    .listen(3000);