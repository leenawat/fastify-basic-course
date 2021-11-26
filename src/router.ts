import { FastifyInstance } from 'fastify'
import index from './controller'

export default async function router(fastify: FastifyInstance) {
    // router prefix

    fastify.register(index, { prefix: '/' })
}