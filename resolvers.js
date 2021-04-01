'use strict';

import pool from './dbConnection.js';

// resolver map, to be used in schema
export const resolvers = {
    Query: {
        getVehicle: async (_, { id }) => {
            const [rows] = await pool.query(`SELECT nid as id, title FROM sky_node
                WHERE nid = ? AND type = 'jarmu'`, id);
            return rows[0];
        }
    },
    Mutation: {
        createVehicle: async (_, { input }) => {
            try {
                const { title } = input;
                const now = Math.round(new Date().getTime() / 1000);
                await pool.query(`INSERT INTO sky_node (title, type, created)
                  VALUES (?, ?, ?)`, [title, 'jarmu', now]);

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
                const { id, title } = input;
                const now = Math.round(new Date().getTime() / 1000);
                let query = 'UPDATE sky_node SET changed = ?,';
                let params = [now];

                if (title) {
                    query += ' title = ?,';
                    params.push(title);
                }

                query = query.slice(0, -1); // remove last ',' from query
                query += ' WHERE type = "jarmu" AND nid = ?';
                params.push(id);

                await pool.execute(query, params);

                const [rows] = await pool.query(`SELECT nid as id, title FROM sky_node
                    WHERE nid = ? AND type = 'jarmu'`, [id]);
                return rows[0];
            }
            catch (e) {
                console.log('updateVehicle error: ', e, '\n');
            }
        },
        deleteVehicle: async (_, { input }) => {
            const { id, title } = input;
            try {
                const [res] = await pool.query(`DELETE FROM sky_node WHERE type = 'jarmu'
                    AND nid = ?`, [id]);
                if (res.affectedRows > 0) return 'succesful deletion';
                return 'vehicle not found';
            }
            catch (e) {
                console.log('deleteVehicle error: ', e, '\n');
            }
        },
    },
};
