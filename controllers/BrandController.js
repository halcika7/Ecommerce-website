const ObjectId = require("mongoose").Types.ObjectId;
const BrandModel = require("../models/Brand");

exports.addBrand = async (req, res) => {
  const name = req.body.name,
    categories = req.body.categories;
  try {
    if (name.length < 2) {
      return res.json({
        error: "Brand name needs to be at least 2 characters"
      });
    }
    if (categories.length < 1) {
      return res.json({ failedMessage: "At least one category required!" });
    }
    const brand = new BrandModel({ name, categories });
    await brand.save();
    return res.json({ successMessage: "Brand Added !" });
  } catch (err) {
    if (err.errmsg) return res.json({ error: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find({});
    return res.json({ brands });
  } catch (err) {
    if (err.errmsg) return res.json({ error: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.getBrand = async (req, res) => {
  try {
    const brand = await BrandModel.findOne({
      _id: new ObjectId(req.query.id)
    }).select("name categories -_id");
    if (!brand) {
      return res.json({
        error: `Brand was not found with id = ${req.query.id}`
      });
    }
    return res.json({ brand });
  } catch (err) {
    if (err.errmsg) return res.json({ error: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.editBrand = async (req, res) => {
  try {
    if (req.body.data.categories.length < 1) {
      return res.json({ failedMessage: "At least one category required!" });
    }
    const brand = await BrandModel.updateOne(
      { _id: new ObjectId(req.body.id) },
      { ...req.body.data }
    );
    if (brand.nModified === 0) {
      return res.json({ failedMessage: "Nothing to update !" });
    }
    return res.json({ successMessage: "Brand Edited !" });
  } catch (err) {
    if (err.errmsg) return res.json({ error: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const deletedBrand = await BrandModel.deleteOne({
      _id: new ObjectId(req.query.id)
    });
    if (deletedBrand.n !== 1) {
      return res.json({
        failedMessage: "Something happened and category was not deleted"
      });
    }
    return res.json({ successMessage: "Category successfully deleted !" });
  } catch (err) {
    if (err.errmsg) return res.json({ error: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};

exports.deleteManyBrands = async (req, res) => {
  const ids = Object.keys(req.query).map(id => req.query[id]);
  try {
    const brands = await BrandModel.deleteMany({ _id: { $in: ids } });
    if (brands.n === 0) {
      return res.json({ failedMessage: "No bradns deleted !" });
    }
    if (brands.n === 1) {
      return res.json({ successMessage: "One brand deleted !" });
    }
    if (brands.n > 1) {
      return res.json({ successMessage: `${brands.n} bradns deleted !` });
    }
  } catch (err) {
    if (err.errmsg) return res.json({ error: err.errmsg });
    return res.json({ failedMessage: err.message });
  }
};
