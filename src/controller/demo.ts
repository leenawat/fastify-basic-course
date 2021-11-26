import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default async function demo(fastfiy: FastifyInstance) {
    // fastfiy.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    //     reply.send({ message: "Hello from DEMO Router" })
    // })

    // C = CREATE
    fastfiy.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ message: "Hello from POST Router" })
    })


    fastfiy.post('/params', async (request: FastifyRequest, reply: FastifyReply) => {
        const body: any = request.body
        const { username, password } = body
        reply.send({ username, password })
    })

    // get params หรือ path variable
    fastfiy.get('/:firstName/:lastName', async (request: FastifyRequest, reply: FastifyReply) => {
        const params: any = request.params
        const { firstName, lastName } = params
        reply.send({ firstName, lastName })
    })

    
    // get query string 
    // firstName=a&lastName=b
    fastfiy.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        const query: any = request.query
        const { firstName, lastName } = query
        reply.send({ firstName, lastName })
    })
}