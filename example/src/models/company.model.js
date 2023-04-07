const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = mongoose.Schema({
name :{type: String,maxLength: 40,required: true,},
description :{type: String,maxLength: 5000,required: true,},
job :{type: objectid,refs: "jobs",required: true,},
taxNumber :{type: String,maxLength: 40,},
phone :{type: String,maxLength: 40,required: true,},
email :{type: String,maxLength: 40,required: true,},},{ timestamps: true });

schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const companies = mongoose.model("companies", schema);

module.exports = companies
