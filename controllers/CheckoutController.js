const ProductModel = require('../models/Product');
const CouponModel = require('../models/Coupon');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;

// dodana funkcionalnost kupona
exports.payment = async (req, res) => {
    const sku = req.query.sku;
    const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1].slice(0,-3) : '';
    const decoded = jwt.decode(token);
    const cartItems = decoded ? decoded.items : [];
    const couponQuery = decoded ? decoded.coupon : {};
    const findIndex = cartItems.findIndex(item => item.sku === sku);

    if(findIndex !== -1) { return res.json({ failedMessage: 'Item already in cart' }); }

	try {
        const checkCoupon = await checkCouponObj(couponQuery);
		const findSkuOption = await ProductModel.aggregate([
			{$match: { 'options.options.sku': sku, 'options.options.quantity': { $gt: 0 } }},
			{$unwind: '$options'},
			{$unwind: '$options.options'},
			{$match: { 'options.options.sku': sku, 'options.options.quantity': { $gt: 0 } }},
			{$unwind: '$options'},
			{$unwind: '$options.options'},
			{$project: { _id:1, name: 1, price: 1, 'options.options':1, 'options.featuredPicture':1, 'options.color':1, 'options.console': 1, 'options.display': 1 }}
        ]);

		const product = {...findSkuOption.map(product => ({ ...product, ...product.options, sku, price: product.price, name: product.name, quantity: 1 }))[0]}
        product.aditionalPrice = product.options.aditionalPrice;
        product.discount = product.options.discount;
        product.total =  product.discount > 0 ? (product.price + product.aditionalPrice) - ( (product.price + product.aditionalPrice) * (product.discount / 100)) : (product.price + product.aditionalPrice);
        product.quantity = 1;
        delete product.options.aditionalPrice;
        delete product.options.discount;
        delete product.options.quantity;
        delete product.options.sku;

        cartItems.push(product);

        const subtotalBefore = +(Math.round((cartItems.reduce((acc, curr) => acc + curr.total, 0)) + "e+2")  + "e-2");
        const cartSubtotal = (checkCoupon && checkCoupon.type === 'percent') ? 
            cartItems.reduce((acc, curr) => acc + curr.total, 0) - (cartItems.reduce((acc, curr) => acc + curr.total, 0) * (checkCoupon.value/100)) :
            (checkCoupon && checkCoupon.type === 'value') ? cartItems.reduce((acc, curr) => acc + curr.total, 0) - checkCoupon.value :
            cartItems.reduce((acc, curr) => acc + curr.total, 0);
        const tax = +(Math.round((cartSubtotal * 0.17) + "e+2")  + "e-2");
        const cartTotal = +(Math.round((cartSubtotal + tax) + "e+2")  + "e-2");

        const coupon = checkCoupon ? {...checkCoupon} : {};

        const cartPrice = {subtotalBefore, subtotal: +(Math.round((cartSubtotal) + "e+2")  + "e-2"), total: cartTotal, tax };

        const jwtToken = await jwt.sign({items: cartItems, cartPrice, coupon}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, successMessage: 'Item added to cart' });
	} catch (err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
}