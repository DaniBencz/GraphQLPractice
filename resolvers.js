'use strict';

import pool from './dbConnection.js';

const friendDatabase = {}; // an in-memory mock-db
class Friend {
    constructor(id, { firstName, lastName, age, isFriend, gender }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.isFriend = isFriend;
        this.gender = gender;
    }
}

// resolver map, to be used in schema
export const resolvers = {
    Query: {
        getFriend: (_, { id }) => {
            // return friendDatabase[id]
            return new Friend(id, friendDatabase[id]);
        },
        getVehicle: async (_, { id }) => {
            const [rows] = await pool.query(`SELECT nid as id, title, uid, status FROM sky_node
                WHERE nid = ? AND type = 'jarmu'`, id);
            return rows[0];
        }
    },
    Mutation: {
        updateVehicle: async (_, { input }) => {
            let query = 'UPDATE sky_node SET';
            let params = [];

            if (input?.uid) {
                query += ' uid = ?,';
                params.push(input.uid);
            }

            if (input?.title) {
                query += ' title = ?,';
                params.push(input.title);
            }

            if (input?.status) {
                query += ' status = ?,';
                params.push(input.status);
            }

            query = query.slice(0, -1); // remove last ',' from query
            query += ' WHERE type = "jarmu" AND nid = ?';
            params.push(input.id);

            await pool.execute(query, params);

            const [rows] = await pool.query(`SELECT nid as id, title, uid, status FROM sky_node
                WHERE nid = ? AND type = 'jarmu'`, input.id);
            return rows[0];
        },
        createFriend: async (_, { input }) => { // _, !!!
            const { default: crypto } = await import('crypto');
            let id = crypto.randomBytes(10).toString('hex');

            friendDatabase[id] = input;
            return new Friend(id, input);
        },
    },
};
