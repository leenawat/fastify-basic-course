import * as knex from 'knex'

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { TestModel } from '../models/test';

export default async function index(fastfiy: FastifyInstance) {
    const db: knex = fastfiy.knex
    const testModel = new TestModel();
    fastfiy.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const rs: any = await testModel.test(db);
            reply.send(rs)
        } catch (error: any) {
            console.log(error)
            reply.code(500).send({ ok: false, error: error.message })
        }
    })
}