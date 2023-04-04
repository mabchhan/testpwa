const { Schema, model } = require('mongoose');


const petSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        breed: {
            type: String,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        },
        image: {
            type: String,
        },
        alt: {
            type: String,
        },
        headline: {
            type: String,
        },
        summary: {
            type: String,
            required: true,
        },
        supplies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Supply'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

petSchema.virtual('supCount').get(function () {
    return this.supplies.length;
});
// replace this with a summer 

const Pet = model('Pet', petSchema);

module.exports = Pet;