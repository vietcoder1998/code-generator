const JobSchema = require('../models/job.model')


exports.findAll = (req, res) => {

    try {
        	
        const job = JobSchema.find();

        res.send({ code: 1, message: 'Success', data: job})
    } catch(err) {
        throw new Error(err)
    }
}
exports.getDetail = (req, res) => {
    try {
        		
const{ jobId } = req.path 
        const job = JobSchema.find({ id: jobId});


        if (!job) {
            res.status(400).send('job is not found in the schema');
        } else {
            res.send({ code: 1, message: 'Success', data: job})
        } 
    } catch(err) {
        throw new Error(err)
    }
}
exports.delete = (req, res) => {
    try {
        		
const{ jobId } = req.path 
        const job = JobSchema.find({ id: jobId});

        if (!job) {
            res.status(400).send('job is not found in the schema');
        } else {
            job.delete({ id: jobId}).then(data => res.send({code: 1, data: data, message: 'Delete successfully'}))
        } 
        
    } catch(err) {
        throw new Error(err)
    }
}
exports.deleteMany = (req, res) => {
    try {
        		
const{ jobIds } = req.body 
        const job = JobSchema.find({ id: jobIds });

        if (!job) {
            res.status(400).send('job is not found in the schema');
        } else {
            job.delete({ id: { $in: jobIds } }).then(data => res.send({code: 1, data: data, message: 'Delete successfully'}));
        } 
    } catch(err) {
        throw new Error(err)
    }
}
exports.updateOne = (req, res) => {
    try {
        	
        const job = JobSchema.find({ id: jobId})        

        if (!job) {
            res.status(400).send('job is not found in the schema');
        }

        job = { ...job, }
        job.update(job).then((data) => res.send({code: 1, data, message: 'Update job success!'}))
    } catch(err) {
        throw new Error(err)
    }
}
exports.apply = (req, res) => {
    try {
        		
const{ jobId, phone, email } = req.path 
        const job = JobSchema.find({ id: jobId})        

        if (!job) {
            res.status(400).send('job is not found in the schema');
        }

        job = { ...job, }
        job.update(job).then((data) => res.send({code: 1, data, message: 'Update job success!'}))
    } catch(err) {
        throw new Error(err)
    }
}
exports.create = (req, res) => {
    try {
        		
const{ title, description, companyId } = req.body 
        const job = JobSchema.find({ id: jobId})        

        if (!job) {
            res.status(400).send('job is not found in the schema');
        }

        job = { ...job, title, description, companyId}
        job.update(job).then((data) => res.send({code: 1, data, message: 'Update job success!'}))
    } catch(err) {
        throw new Error(err)
    }
}