import { FastifyInstance } from 'fastify'
import indexRoute from './controller'
import demoRoute from './controller/demo'
import testRoute from './controller/test'
import userRoute from './controller/user'

export default async function router(fastify: FastifyInstance) {
    // router prefix

    fastify.register(indexRoute, { prefix: '/' })
    fastify.register(demoRoute, { prefix: '/demo' })
    fastify.register(testRoute, { prefix: '/test' })
    fastify.register(userRoute, { prefix: '/users' })
}