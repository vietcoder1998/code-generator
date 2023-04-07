const CompanySchema = require('../models/company.model')


exports.findAll = (req, res) => {

    try {
        	
        const company = CompanySchema.find();

        res.send({ code: 1, message: 'Success', data: company})
    } catch(err) {
        throw new Error(err)
    }
}
exports.getDetail = (req, res) => {
    try {
        		
const{ companyId } = req.path 
        const company = CompanySchema.find({ id: companyId});


        if (!company) {
            res.status(400).send('company is not found in the schema');
        } else {
            res.send({ code: 1, message: 'Success', data: company})
        } 
    } catch(err) {
        throw new Error(err)
    }
}
exports.delete = (req, res) => {
    try {
        		
const{ companyId } = req.path 
        const company = CompanySchema.find({ id: companyId});

        if (!company) {
            res.status(400).send('company is not found in the schema');
        } else {
            company.delete({ id: companyId}).then(data => res.send({code: 1, data: data, message: 'Delete successfully'}))
        } 
        
    } catch(err) {
        throw new Error(err)
    }
}
exports.deleteMany = (req, res) => {
    try {
        		
const{ companyIds } = req.body 
        const company = CompanySchema.find({ id: companyIds });

        if (!company) {
            res.status(400).send('company is not found in the schema');
        } else {
            company.delete({ id: { $in: companyIds } }).then(data => res.send({code: 1, data: data, message: 'Delete successfully'}));
        } 
    } catch(err) {
        throw new Error(err)
    }
}
exports.updateOne = (req, res) => {
    try {
        	
        const company = CompanySchema.find({ id: companyId})        

        if (!company) {
            res.status(400).send('company is not found in the schema');
        }

        company = { ...company, }
        company.update(company).then((data) => res.send({code: 1, data, message: 'Update company success!'}))
    } catch(err) {
        throw new Error(err)
    }
}
exports.create = (req, res) => {
    try {
        		
const{ name, description, tax, email, phone } = req.body 
        const company = CompanySchema.find({ id: companyId})        

        if (!company) {
            res.status(400).send('company is not found in the schema');
        }

        company = { ...company, name, description, tax, email, phone}
        company.update(company).then((data) => res.send({code: 1, data, message: 'Update company success!'}))
    } catch(err) {
        throw new Error(err)
    }
}