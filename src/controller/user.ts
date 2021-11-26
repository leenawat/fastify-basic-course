import * as crypto from 'crypto';
import * as knex from 'knex'

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { UserModel } from '../models/user';

export default async function users(fastfiy: FastifyInstance) {
    const db: knex = fastfiy.knex
    const userModel = new UserModel();

    // CREATE
    fastfiy.post('/', async (request: FastifyRequest, reply: FastifyReply) => {
        const body: any = request.body;
        const { username, password, firstName, lastName } = body;
        const encPassword = crypto.createHash('md5').update(password).digest('hex')
        try {
            const rs: any = await userModel.create(db, {
                username,
                password: encPassword,
                first_name: firstName,
                last_name: lastName
            });
            reply.send({ ok: true })
        } catch (error: any) {
            console.log(error)
            reply.code(500).send({ ok: false, error: error.message })
        }
    })

    // READ
    fastfiy.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const rs: any = await userModel.read(db);
            reply.send(rs)
        } catch (error: any) {
            console.log(error)
            reply.code(500).send({ ok: false, error: error.message })
        }
    })

    // READ /users/search?q=xxx
    fastfiy.get('/search', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const query: any = request.query
            const q = query.q;
            const rs: any = await userModel.search(db, q);
            reply.send(rs)
        } catch (error: any) {
            console.log(error)
            reply.code(500).send({ ok: false, error: error.message })
        }
    })
}