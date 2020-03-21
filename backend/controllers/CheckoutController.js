const OrderModel = require('../models/Order');
const UserModel = require('../models/User');
const ProductModel = require('../models/Product');
const ObjectId = require('mongoose').Types.ObjectId;
const stripeKey = require('../config/keys').stripeSecretKey;
const validatePayment = require('../validation/payment');
const stripe = require('stripe')(stripeKey);

const BaseController = require('./BaseController');

class CheckutController extends BaseController {
  constructor() {
    super(CheckutController);
  }

  async payment(req, res) {
    const {
      errors,
      items,
      userData,
      coupon,
      cartPrice,
      tokenId,
      isValid,
      cart
    } = await validatePayment(req.body);

    if (!cart) {
      return res.json({ failedMessage: 'No items in cart' });
    } else if (!isValid) {
      return res.json(errors);
    }

    try {
      const findUser = await UserModel.findOne({
        _id: ObjectId(userData.userId)
      });

      if (!findUser) {
        return res.json({ failedMessage: 'We could not find user...' });
      }

      await stripe.charges.create({
        amount: cartPrice.total * 100,
        currency: 'usd',
        source: tokenId,
        description: 'Successfull order'
      });

      items.forEach(async item => {
        try {
          const quantity = item.quantity;
          await ProductModel.findOneAndUpdate(
            { 'options.options.sku': item.sku },
            {
              $inc: {
                numberOfsales: quantity,
                'options.$.options.$[option].quantity': -quantity
              }
            },
            { arrayFilters: [{ 'option.sku': item.sku }] }
          );
        } catch (err) {
          console.log('err', err);
        }
      });

      const orderedItems = items.map(item => {
        const product = {
          sku: item.sku,
          name: item.name,
          picture: item.featuredPicture,
          quantity: item.quantity,
          options: {
            ...item.options,
            color: item.color ? item.color : null,
            display: item.display ? item.display : null,
            console: item.console ? item.console : null
          }
        };
        !item.color && delete product.options.color;
        !item.display && delete product.options.display;
        !item.console && delete product.options.console;
        return product;
      });

      const couponApplied =
        Object.keys(coupon).length > 0
          ? {
              applied: true,
              code: coupon.code,
              value: coupon.value,
              couponType: coupon.type
            }
          : { applied: false };

      const newOrder = new OrderModel({
        userId: userData.userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        telephone: userData.telephone,
        country: userData.country,
        address: userData.address,
        city: userData.city,
        zip: userData.zip,
        orderNotes: userData.notes,
        payed: cartPrice.total,
        coupon: couponApplied,
        products: orderedItems
      });
      await newOrder.save();

      return res.json({ successMessage: 'Successfull order !!' });
    } catch (err) {
      if (err.errmsg) return res.json({ failedMessage: err.errmsg });
      return res.json({ failedMessage: err.message });
    }
  }
}

const CheckutControllerInstance = new CheckutController();

module.exports = CheckutControllerInstance;
