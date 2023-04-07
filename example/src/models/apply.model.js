const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = mongoose.Schema({
message :{type: String,maxLength: 1000,required: true,},
phone :{type: String,maxLength: 40,required: true,},
email :{type: String ,maxLength: 40,},
job :{type: Schema.Types.ObjectId,maxLength: 40,refs: "jobs",required: true,},},{ timestamps: true });

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const applies = mongoose.model("applies", schema);

module.exports = applies
