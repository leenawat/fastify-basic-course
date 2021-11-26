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

    // UPDATE
    fastfiy.put('/:userId', async (request: FastifyRequest, reply: FastifyReply) => {
        const body: any = request.body;
        const params: any = request.params;

        const { password, firstName, lastName } = body;

        const userId = params.userId;

        try {
            const data: any = {};
            data.first_name = firstName;
            data.last_name = lastName;
            if (password) {
                data.password = crypto.createHash('md5').update(password).digest('hex')
            }
            await userModel.update(db, userId, data);
            reply.send({ ok: true })
        } catch (error: any) {
            console.log(error)
            reply.code(500).send({ ok: false, error: error.message })
        }
    })

     // DELETE
     fastfiy.delete('/:userId', async (request: FastifyRequest, reply: FastifyReply) => {
        const params: any = request.params;
        const userId = params.userId;

        try {
            await userModel.delete(db, userId);
            reply.send({ ok: true })
        } catch (error: any) {
            console.log(error)
            reply.code(500).send({ ok: false, error: error.message })
        }
    })
}