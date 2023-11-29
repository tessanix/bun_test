import { Elysia } from 'elysia';
import { html } from '@elysiajs/html'

const part1 = Bun.file("registrationForm.html").text();

new Elysia()
    .use(html())
    //.decorate('part1',  Bun.file("registrationForm.html").text())
    .get('/', () => (
        <html lang='en'>
            <head>
                <title>Hello World</title>
            </head>
            <body>
                {part1}
                <h1>Hello World</h1>
            </body>
        </html>
    ))
    .listen(3000)
