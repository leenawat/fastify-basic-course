import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

export default async function index(fastfiy: FastifyInstance) {
    fastfiy.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        reply.send({ message: "Hello world!" })
    })
}