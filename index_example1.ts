
const server = Bun.serve({
    port: 3000,
    fetch(req){
        const url = new URL(req.url)
        
        if(url.pathname === '/') {
            return new Response("Page 1")
        }
        if(url.pathname === '/about'){
            return new Response("About me!")
        }
        if(url.pathname === '/greet') {
            return new Response(Bun.file('./greet.txt'))
        }
        return new Response('error 404')
    }
})

console.log(`listening on port ${server.port}`)