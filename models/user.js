const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./thoughts');

// Schema for user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Must match a valid email address']
        },
        thoughts: [ {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
            },
        ],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
        ]
        },
        {
            toJSON: {
                virtuals: true
            },
            id: false,
        }
    );

// Friends virtual
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

module.exports = user;