import { FastifyInstance } from "fastify";
import * as knex from 'knex'

declare module "fastify" {
    interface FastifyInstance {
        db: knex
        knex: knex
    }
}