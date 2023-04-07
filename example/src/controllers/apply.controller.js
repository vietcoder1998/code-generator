const ApplySchema = require('../models/apply.model')


exports.findAll = (req, res) => {

    try {
        	
        const apply = ApplySchema.find();

        res.send({ code: 1, message: 'Success', data: apply})
    } catch(err) {
        throw new Error(err)
    }
}
exports.getDetail = (req, res) => {
    try {
        		
const{ applyId } = req.path 
        const apply = ApplySchema.find({ id: applyId});


        if (!apply) {
            res.status(400).send('apply is not found in the schema');
        } else {
            res.send({ code: 1, message: 'Success', data: apply})
        } 
    } catch(err) {
        throw new Error(err)
    }
}
exports.delete = (req, res) => {
    try {
        		
const{ applyId } = req.path 
        const apply = ApplySchema.find({ id: applyId});

        if (!apply) {
            res.status(400).send('apply is not found in the schema');
        } else {
            apply.delete({ id: applyId}).then(data => res.send({code: 1, data: data, message: 'Delete successfully'}))
        } 
        
    } catch(err) {
        throw new Error(err)
    }
}
exports.deleteMany = (req, res) => {
    try {
        		
const{ applyIds } = req.body 
        const apply = ApplySchema.find({ id: applyIds });

        if (!apply) {
            res.status(400).send('apply is not found in the schema');
        } else {
            apply.delete({ id: { $in: applyIds } }).then(data => res.send({code: 1, data: data, message: 'Delete successfully'}));
        } 
    } catch(err) {
        throw new Error(err)
    }
}
exports.updateOne = (req, res) => {
    try {
        		
const{ title, message, cvLink } = req.body 	
const{ applyId } = req.query 
        const apply = ApplySchema.find({ id: applyId})        

        if (!apply) {
            res.status(400).send('apply is not found in the schema');
        }

        apply = { ...apply, title, message, cvLink}
        apply.update(apply).then((data) => res.send({code: 1, data, message: 'Update apply success!'}))
    } catch(err) {
        throw new Error(err)
    }
}