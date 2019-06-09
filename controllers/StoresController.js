const ObjectId = require('mongoose').Types.ObjectId;
const fs = require('fs-extra');
const StoresModel = require('../models/Stores');
const {addStoreValidation} = require('../validation/stores');

exports.addStore = async (req, res) => {
    const { address, country, city, location, weekHours, satHours, email, phone, links } = JSON.parse(req.body.options);
    const { errors, isValid } = await addStoreValidation(req.body, req.file);
	if (!isValid) { return res.json(errors); }

    try {
        const addStore = new StoresModel({ address,picture: req.file.path, country, city, location, weekHours, saturdayHours: satHours, email, phone, links });
        await addStore.save();
        return res.json({ successMessage: 'Store added' });
    }catch (err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
    }
}

exports.updateStore = async (req, res) => {
    const { address, country, city, location, weekHours, satHours, email, phone, links } = JSON.parse(req.body.options);
    const id = req.body.id;
    let { errors, isValid } = await addStoreValidation(req.body, req.file, id);
    if (!isValid) { return res.json(errors); }
    try {
        const updateObj = req.file ? { address, picture: req.file.path , country, city, location, weekHours, saturdayHours: satHours, email, phone, links } : { address, country, city, location, weekHours, saturdayHours: satHours, email, phone, links };
        await StoresModel.updateOne({_id: new ObjectId(id)}, updateObj);
        const store = await StoresModel.findOne({_id: new ObjectId(id)});
        return res.json({ successMessage: 'Store updated', store });
    }catch (err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
    }
}

exports.deleteStore = async (req, res) => {
    try{
        const findStore = await StoresModel.findOne({ _id: new ObjectId(req.query.id) });
        if(findStore) { await fs.remove(findStore.picture); }
        await StoresModel.deleteOne({ _id: new ObjectId(req.query.id) });
        const stores = await StoresModel.aggregate([
            {$match: {}},
            {$project: {
                address:1,
                city:1,
                country:1,
                picture:1,
                email:1,
                phone:1
            }}
        ]);
        return res.json({ successMessage: 'Store deleted', stores });
    } catch(err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
    }
}

exports.getAllStores = async (req, res) => {
    try {
        const stores = await StoresModel.aggregate([
            {$match: {}},
            {$project: {
                address:1,
                city:1,
                country:1,
                picture:1,
                email:1,
                phone:1
            }}
        ]);
        return res.json({stores})
    }catch(err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
    }
}

exports.getStore = async (req,res) => {
    try {
        const store = await StoresModel.findOne({ _id: new ObjectId(req.query.id) });

        return res.json({ store });
    } catch (err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
    }
}

exports.getStoreContact = async (req,res) => {
    try {
        const store = await StoresModel.findOne({}).select('address phone email links location -_id');

        return res.json({ store });
    } catch (err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
    }
}

exports.getAllStoresFront = async (req, res) => {
    try {
        const stores = await StoresModel.aggregate([
            {$match: {}},
            { $group : { _id: { 'country': '$country', 'city': '$city' },stores: { $push: "$$ROOT" }} },
            { $group : { _id:  '$_id.country',stores: { $push: "$$ROOT" }}},
            { $sort: { _id: 1 } }
        ]);

        return res.json({stores})
    }catch(err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
    }
}