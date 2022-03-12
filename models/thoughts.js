const { Schema, model } = require('mongoose');
const reactionsSchema = require('./reactions');

// Schema for thoughts model
const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionsSchema]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

const thoughts = model('thoughts', thoughtsSchema);

module.exports = thoughts;