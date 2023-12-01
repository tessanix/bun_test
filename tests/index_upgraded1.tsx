import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { BaseHtml } from './base_html.tsx'


const app = new Elysia()
    .use(html())
    .get("/", () =>  <BaseHtml><div>PART 1</div></BaseHtml>)
    .listen(3000);
