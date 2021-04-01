'use strict';

import pool from './dbConnection.js';

// resolver map, to be used in schema
export const resolvers = {
    Query: {
        getVehicle: async (_, { id }) => {
            const [rows] = await pool.query(`SELECT nid as id, title, uid, status FROM sky_node
                WHERE nid = ? AND type = 'jarmu'`, id);
            return rows[0];
        }
    },
    Mutation: {
        createVehicle: async (_, { input }) => {
            try {
                const { title, status } = input;
                const now = Math.round(new Date().getTime() / 1000);
                await pool.query(`INSERT INTO sky_node (uid, title, status, type, created)
                  VALUES (1, ?, ?, ?, ?)`, [title, status ? status : 1, 'jarmu', now]);

                const [rows] = await pool.query(`SELECT nid as id, title FROM sky_node
                    WHERE type = 'jarmu' AND created = ?`, [now]);
                return rows[0];
            }
            catch (e) {
                console.log('createVehicle error: ', e, '\n');
                // if error handling not in place, the error message gets sent to client, no good
            }
        },
        updateVehicle: async (_, { input }) => {
            try {
                const { id, title, status } = input;
                const now = Math.round(new Date().getTime() / 1000);
                let query = 'UPDATE sky_node SET changed = ?,';
                let params = [now];

                if (title) {
                    query += ' title = ?,';
                    params.push(title);
                }

                if (status) {
                    query += ' status = ?,';
                    params.push(status);
                }

                query = query.slice(0, -1); // remove last ',' from query
                query += ' WHERE type = "jarmu" AND nid = ?';
                params.push(id);

                await pool.execute(query, params);

                const [rows] = await pool.query(`SELECT nid as id, title, status FROM sky_node
                    WHERE nid = ? AND type = 'jarmu'`, [id]);
                return rows[0];
            }
            catch (e) {
                console.log('updateVehicle error: ', e, '\n');
            }
        },
        deleteVehicle: async (_, { input }) => {
            try {
                // here a success string is returned
                return 'succesful deletion';

            }
            catch (e) {
                console.log('deleteVehicle error: ', e, '\n');
            }
        },


        /*         createFriend: async (_, { input }) => { // _, !!!
                    const { default: crypto } = await import('crypto');
                    let id = crypto.randomBytes(10).toString('hex');
        
                    friendDatabase[id] = input;
                    return new Friend(id, input);
                }, */
    },
};
