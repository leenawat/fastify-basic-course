import * as knex from 'knex'
export class UserModel {
    create(db: knex, data: any) {
        return db('users')
            .insert(data)
    }

    read(db: knex) {
        return db('users')
        .select('user_id', 'first_name', 'last_name') // select * from users
    }

    search(db: knex, query: any) {
        const _query = '%' + query + '%';
        return db('users')
            .select('user_id', 'first_name', 'last_name')
            .where('first_name', 'like', _query)
            .orderBy('first_name')
    }
}