'use strict';

const friendDatabase = {}; // an in-memory mock-db
class Friend {
    constructor(id, { firstName, lastName, email }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

const resolvers = {
    getFriend: ({ id }) => {
        // return friendDatabase[id]
        return new Friend(id, friendDatabase[id]);
    },
    createFriend: async ({ input }) => {
        const { default: crypto } = await import('crypto');
        let id = crypto.randomBytes(10).toString('hex');
        friendDatabase[id] = input;
        return new Friend(id, input);
    }
};

export default resolvers;
