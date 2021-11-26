import * as fastify from 'fastify'

import routers from './router'

const app: fastify.FastifyInstance = fastify.fastify({
    logger: {
        level: 'info'
    }
})
app.register(require('fastify-cors'))
app.register(require('fastify-formbody'))

// register knex
app.register(require('fastify-knexjs'), {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'fastify_db'
    },
    debug: true
})

app.register(routers)

export default app