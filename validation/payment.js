const Validator = require("validator");
const isEmpty = require("./is-empty");
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;
const CouponModel = require("../models/Coupon");
const ProductModel = require('../models/Product');

const easypost = require('../config/keys').easypostKey;
const Easypost = require('@easypost/api');
const api = new Easypost(easypost);

module.exports = addUserValidation = async data => {
  let errors = {};
  const { cart, userData, tokenId } = data;
  const { items, coupon, cartPrice } = jwt.decode(cart.slice(7,), secret);

  if (Validator.isEmpty(userData.firstName)) errors.firstName = "First Name field is required";
  if (Validator.isEmpty(userData.lastName)) errors.lastName = "Last Name field is required";
  if (Validator.isEmpty(userData.email)) errors.email = "Email field is required";
  if (!Validator.isEmail(userData.email)) errors.email = "Email is invalid";
  if (Validator.isEmpty(userData.address)) errors.address = "Address field is required";
  if (Validator.isEmpty(userData.telephone)) errors.telephone = "Telephone field is required";
  if (Validator.isEmpty(userData.country)) errors.country = "Country field is required";
  if (Validator.isEmpty(userData.city)) errors.city = "City field is required";
  if (Validator.isEmpty(userData.zip)) errors.zip = "Zip/postal field is required";
  if (Validator.isEmpty(tokenId)) errors.tokenId = "Token invalid";

  if(items.length > 0) {
    const promises = await items.map(async item => {
    const findSkuOption = await ProductModel.aggregate([
        {$match: { 'options.options.sku': item.sku, 'options.options.quantity': { $gte: item.quantity } }},
        {$unwind: '$options'},
        {$unwind: '$options.options'},
        {$match: { 'options.options.sku': item.sku, 'options.options.quantity': { $gte: item.quantity } }},
        {$unwind: '$options'},
        {$unwind: '$options.options'},
        {$project: { _id:1, name: 1, price: 1, 'options.options':1, 'options.featuredPicture':1, 'options.color':1, 'options.console': 1, 'options.display': 1 }}
    ]);
    if(findSkuOption.length !== 1) {
        return {error: `Product with sku=${item.sku} not available with quantity=${item.quantity}`};
    }
    return {};
    });

    errors.products = await Promise.all(promises);

    const findNotEmptyErrorOption = errors.products.find(
        err => Object.keys(err).length !== 0
    );

    !findNotEmptyErrorOption && delete errors.products;
  }


  if(Object.keys(coupon).length > 0) {
      try {
          const checkCoupon = await CouponModel.findOne({ name: coupon.code, exparationDate: { $gt: new Date() } });
          if(!checkCoupon) { errors.coupon = 'Provided coupon code expired' }
      }catch (err) {
        errors.coupon = 'Invalid coupon' ;
      }
  }

  const verifiableAddress = new api.Address({
    verify: ['delivery'],
    street1: userData.address, // street1 will be cleaned up
    city: userData.city,
    zip: userData.zip,
    country: userData.country
  });

  try {
    const response = await verifiableAddress.save();
    if(response.verifications.delivery.success === false) {
        const errs = response.verifications.delivery.errors;
        errs.forEach(error => {
            if(error.code === 'E.ADDRESS.NOT_FOUND') {
                errors.address = error.message;
            }
            if(error.code === 'E.HOUSE_NUMBER.MISSING') {
                errors.address = errors.address + '. ' + error.message;
            }
            if(error.code === 'E.STREET.INVALID') {
                errors.address = error.message + '. Suggestion: ' + error.suggestion;
            }
            if(error.code === 'E.ADDRESS.INVALID') {
                errors.city = error.message;
            }
        })
    }
    if(response.verifications.delivery.success === true) {
        if(userData.address.toUpperCase() !== response.street1) {
            errors.address = 'Invalid Address';
        }
        if(userData.city.toUpperCase() !== response.city) {
            errors.city = 'No match for city';
        }
        if(userData.country.toUpperCase() !== response.country) {
            errors.country = 'No match for country';
        }
        if(userData.zip !== response.zip) {
            errors.zip = `Zip/postal code does not match. Maybe you thought ${response.zip}`;
        }
    }
  } catch (err) {
      if(err.error && err.error.error && err.error.error.code === 'ADDRESS.PARAMETERS.INVALID') {
          errors.address = err.error.error.message;
      }
  }
  return { errors: { errors }, items, coupon, cartPrice, userData, tokenId, isValid: isEmpty(errors) };
};
