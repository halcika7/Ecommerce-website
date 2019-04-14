const ObjectId = require('mongoose').Types.ObjectId;
const CategoryIconModel = require('../models/CategoryIcon');
const CategoryModel = require('../models/Category');
const validateIcon = require('../helpers/iconshelper').validateicon;

exports.addCategoryIcon = async (req, res) => {
    const resValidation = validateIcon(req.body.name);
    if(resValidation) { return res.json(resValidation); }
    try{
        const categoryIcon = new CategoryIconModel({ name: req.body.name });
        await categoryIcon.save();
        return res.json({ successMessage: 'Category Icon Added !' });
    }catch (err) {
        if(err.errmsg) return res.json({ error: err.errmsg });
        return res.json({ failedMessage: err.message });
    }
}

exports.getAllCategoryIcons = async (req, res) => {
    try{
        const categoryIcons = await CategoryIconModel.find({});
        return res.json({ categoryIcons });
    }catch (err) {
        return res.json({ failedMessage: err.message });
    }
}

exports.getCategoryIcon = async (req, res) => {
    try{
        const icon = await CategoryIconModel.findOne({ _id: new ObjectId(req.query.id) }).select('name -_id');
        if(!icon) { return res.json({ error: `Category Icon with id = ${req.query.id} was not found` }); }
        return res.json({ icon });
    }catch (err) {
        return res.json({ failedMessage: err.message });
    }
}

exports.editCategoryIcon = async (req, res) => {
    const resValidation = validateIcon(req.body.name);
    if(resValidation) { return res.json(resValidation); }

    try {
        const findIcon = await CategoryIconModel.findOne({ _id: new ObjectId(req.body.id) });
        const iconUpdate = await CategoryIconModel.updateOne({ _id: new ObjectId(req.body.id) }, { name: req.body.name });
        if(iconUpdate.nModified === 0) { return res.json({ failedMessage: 'You provided same icon !' }) }
        await CategoryModel.updateOne({ icon: findIcon.name }, { icon: req.body.name });
        return res.json({ successMessage: 'Category Icon Updated !' });
    }catch (err) {
        if(err.errmsg) return res.json({ error: err.errmsg });
        return res.json({ failedMessage: err.message });
    }

}

exports.deleteCategoryIcon = async (req, res) => {
    try {
        const findIcon = await CategoryIconModel.findOne({ _id: new ObjectId(req.query.id) });
        const categoryWithIcon = await CategoryModel.findOne({ icon: findIcon.name });
        if(categoryWithIcon) { return res.json({ failedMessage: `Icon can't be deleted because it is in use in category with id= ${categoryWithIcon._id}` }) }
        const deletedCategoryIcon = await CategoryIconModel.deleteOne({ _id: new ObjectId(req.query.id) });
        if(deletedCategoryIcon.n !== 1) {
            return res.json({ failedMessage: 'Something happened and category was not deleted' });
        }
        return res.json({ successMessage: 'Icon successfully deleted !' });
    }catch(err) {
        if(err.errmsg) return res.json({ error: err.errmsg });
        return res.json({ failedMessage: err.message });
    }
}