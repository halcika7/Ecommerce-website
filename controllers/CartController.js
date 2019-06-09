const ProductModel = require('../models/Product');
const CouponModel = require('../models/Coupon');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;

// dodana funkcionalnost kupona
exports.addToCart = async (req, res) => {
    const sku = req.query.sku;
    const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1] : '';
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

exports.deleteFromCart = async (req, res) => {
    try {
        const sku = req.query.sku;
        const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1] : '';
        const decoded = jwt.decode(token);
        const cartItems = decoded ? decoded.items : [];
        const findIndex = cartItems.findIndex(item => item.sku === sku);
        
        if(findIndex === -1) { return res.json({ failedMessage: 'Item not in cart' }); }
        
        cartItems.splice(findIndex, 1);

        const couponQuery = decoded ? decoded.coupon : {};
        const checkCoupon = await checkCouponObj(couponQuery);
        const coupon = (checkCoupon && cartItems.length > 0) ? {...checkCoupon} : {};

        const subtotalBefore = +(Math.round((cartItems.reduce((acc, curr) => acc + curr.total, 0)) + "e+2")  + "e-2");
        const cartSubtotal = (Object.keys(coupon).length > 0 && coupon.type === 'percent' && cartItems.length > 0) ? 
            cartItems.reduce((acc, curr) => acc + curr.total, 0) - (cartItems.reduce((acc, curr) => acc + curr.total, 0) * (checkCoupon.value/100)) :
            (Object.keys(coupon).length > 0 && coupon.type === 'value' && cartItems.length > 0) ? cartItems.reduce((acc, curr) => acc + curr.total, 0) - checkCoupon.value :
            cartItems.reduce((acc, curr) => acc + curr.total, 0);
        const tax = +(Math.round((cartSubtotal * 0.17) + "e+2")  + "e-2");
        const cartTotal = +(Math.round((cartSubtotal + tax) + "e+2")  + "e-2");

        const cartPrice = { subtotalBefore, subtotal: +(Math.round((cartSubtotal) + "e+2")  + "e-2"), total: cartTotal, tax };

        const jwtToken = await jwt.sign({items: cartItems, cartPrice, coupon}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, successMessage: 'Item deleted from cart' });
    }catch (err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
    }
}

exports.updateCartItem = async (req, res) => {
    const sku = req.query.sku;
    const value = JSON.parse(req.query.value);
    const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1] : '';
    const decoded = jwt.decode(token);
    const cartItems = decoded ? decoded.items : [];
    const couponQuery = decoded ? decoded.coupon : {};
    const findIndex = cartItems.findIndex(item => item.sku === sku);

    if(value < 1) { return res.json({ failedMessage: 'Invalid value entered' }); }

    if(findIndex === -1) { return res.json({ failedMessage: 'Item not in cart' }); }

	try {
		const findSkuOption = await ProductModel.aggregate([ {$match: { 'options.options.sku': sku, 'options.options.quantity': { $gte: value } }} ]);

        if(findSkuOption.length === 0) { return res.json({ failedMessage: "That quantity is not available for that product" }) }

        const updatedCartItems = cartItems.map(item => {
            const newItem = { ...item };
            if(item.sku === sku) {
                newItem.quantity = value;
                newItem.total =  newItem.discount > 0 ? ((newItem.price + newItem.aditionalPrice) * value) - ( ((newItem.price + newItem.aditionalPrice) * value) * (newItem.discount / 100)) : 
                                (newItem.price + newItem.aditionalPrice) * value;
            }
            return newItem;
        })

        const checkCoupon = await checkCouponObj(couponQuery);
        const coupon = checkCoupon ? {...checkCoupon} : {};

        const subtotalBefore = +(Math.round((updatedCartItems.reduce((acc, curr) => acc + curr.total, 0)) + "e+2")  + "e-2");
        const cartSubtotal = (Object.keys(coupon).length > 0 && coupon.type === 'percent') ? 
            updatedCartItems.reduce((acc, curr) => acc + curr.total, 0) - (updatedCartItems.reduce((acc, curr) => acc + curr.total, 0) * (checkCoupon.value/100)) :
            (Object.keys(coupon).length > 0 && coupon.type === 'value') ? updatedCartItems.reduce((acc, curr) => acc + curr.total, 0) - checkCoupon.value :
            updatedCartItems.reduce((acc, curr) => acc + curr.total, 0);
        const tax = +(Math.round((cartSubtotal * 0.17) + "e+2")  + "e-2");
        const cartTotal = +(Math.round((cartSubtotal + tax) + "e+2")  + "e-2");

        const cartPrice = { subtotalBefore, subtotal: +(Math.round((cartSubtotal) + "e+2")  + "e-2"), total: cartTotal, tax };

        const jwtToken = await jwt.sign({items: updatedCartItems, cartPrice, coupon}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, successMessage: 'Item quantity updated' });
	} catch (err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
}

exports.moveToSaveForLater = async (req, res) => {
    const sku = req.query.sku;
    const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1] : '';
    const tokenSave = req.query.saveForLaterItems !== "null" ? req.query.saveForLaterItems.split(' ')[1] : '';
    const decodedCartItems = jwt.decode(token);
    const decodedSaveForLaterItems = jwt.decode(tokenSave);
    const cartItems = decodedCartItems ? decodedCartItems.items : [];
    const couponQuery = decodedCartItems ? decodedCartItems.coupon : {};
    const savedForLaterItems = decodedSaveForLaterItems ? decodedSaveForLaterItems.savedForLater : [];
    const findIndex = cartItems.findIndex(item => item.sku === sku);
    const findIndexSave = savedForLaterItems.findIndex(item => item.sku === sku);

    if(findIndex === -1) { return res.json({ failedMessage: 'Item not in Cart' }); }
    if(findIndexSave !== -1) { return res.json({ failedMessage: 'Item already Saved for later' }); }

	try {
        const newSavedProduct = {...cartItems[findIndex], total:cartItems[findIndex].total/cartItems[findIndex].quantity, quantity: 1};
        cartItems.splice(findIndex, 1);
        savedForLaterItems.push(newSavedProduct);

        const checkCoupon = await checkCouponObj(couponQuery);
        const coupon = (checkCoupon && cartItems.length > 0) ? {...checkCoupon} : {};

        const subtotalBefore = +(Math.round((cartItems.reduce((acc, curr) => acc + curr.total, 0)) + "e+2")  + "e-2");
        const cartSubtotal = (Object.keys(coupon).length > 0 && coupon.type === 'percent' && cartItems.length > 0) ? 
            cartItems.reduce((acc, curr) => acc + curr.total, 0) - (cartItems.reduce((acc, curr) => acc + curr.total, 0) * (checkCoupon.value/100)) :
            (Object.keys(coupon).length > 0 && coupon.type === 'value' && cartItems.length > 0) ? cartItems.reduce((acc, curr) => acc + curr.total, 0) - checkCoupon.value :
            cartItems.reduce((acc, curr) => acc + curr.total, 0);
        const tax = +(Math.round((cartSubtotal * 0.17) + "e+2")  + "e-2");
        const cartTotal = +(Math.round((cartSubtotal + tax) + "e+2")  + "e-2");

        const cartPrice = { subtotalBefore, subtotal: cartSubtotal, total: cartTotal, tax };

        const jwtToken = await jwt.sign({items: cartItems, cartPrice, savedForLater: savedForLaterItems, coupon}, secret, null);
        const jwtTokenSave = await jwt.sign({savedForLater: savedForLaterItems}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, save: 'Bearer ' + jwtTokenSave, successMessage: 'Item moved to save for later' });
	} catch (err) {
        console.log(err)
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
}

exports.moveToCart = async (req, res) => {
    const sku = req.query.sku;
    const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1] : '';
    const tokenSave = req.query.saveForLaterItems !== "null" ? req.query.saveForLaterItems.split(' ')[1] : '';
    const decodedCartItems = jwt.decode(token);
    const decodedSaveForLaterItems = jwt.decode(tokenSave);
    const cartItems = decodedCartItems ? decodedCartItems.items : [];
    const couponQuery = decodedCartItems ? decodedCartItems.coupon : {};
    const savedForLaterItems = decodedSaveForLaterItems ? decodedSaveForLaterItems.savedForLater : [];
    const findIndex = cartItems.findIndex(item => item.sku === sku);
    const findIndexSave = savedForLaterItems.findIndex(item => item.sku === sku);

    if(findIndex !== -1) { return res.json({ failedMessage: 'Item already in Cart' }); }
    if(findIndexSave === -1) { return res.json({ failedMessage: 'Item not saved for later' }); }

	try {
        const newCartProduct = {...savedForLaterItems[findIndexSave]};
        cartItems.push(newCartProduct);
        savedForLaterItems.splice(findIndexSave, 1);

        const checkCoupon = await checkCouponObj(couponQuery);
        const coupon = checkCoupon ? {...checkCoupon} : {};

        const subtotalBefore = +(Math.round((cartItems.reduce((acc, curr) => acc + curr.total, 0)) + "e+2")  + "e-2");
        const cartSubtotal = (Object.keys(coupon).length > 0 && coupon.type === 'percent') ? 
            cartItems.reduce((acc, curr) => acc + curr.total, 0) - (cartItems.reduce((acc, curr) => acc + curr.total, 0) * (checkCoupon.value/100)) :
            (Object.keys(coupon).length > 0 && coupon.type === 'value') ? cartItems.reduce((acc, curr) => acc + curr.total, 0) - checkCoupon.value :
            cartItems.reduce((acc, curr) => acc + curr.total, 0);
        const tax = +(Math.round((cartSubtotal * 0.17) + "e+2")  + "e-2");
        const cartTotal = +(Math.round((cartSubtotal + tax) + "e+2")  + "e-2");

        const cartPrice = { subtotalBefore, subtotal: cartSubtotal, total: cartTotal, tax };

        const jwtToken = await jwt.sign({items: cartItems, cartPrice, savedForLater: savedForLaterItems, coupon}, secret, null);
        const jwtTokenSave = await jwt.sign({savedForLater: savedForLaterItems}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, save: 'Bearer ' + jwtTokenSave, successMessage: 'Item moved to cart' });
	} catch (err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
}

exports.deleteFromSavedForLater = async (req, res) => {
    const sku = req.query.sku;
    const tokenSave = req.query.saveForLaterItems !== "null" ? req.query.saveForLaterItems.split(' ')[1] : '';
    const decodedSaveForLaterItems = jwt.decode(tokenSave);
    const savedForLaterItems = decodedSaveForLaterItems ? decodedSaveForLaterItems.savedForLater : [];
    const findIndexSave = savedForLaterItems.findIndex(item => item.sku === sku);

    if(findIndexSave === -1) { return res.json({ failedMessage: 'Item not saved for later' }); }

	try {
        savedForLaterItems.splice(findIndexSave, 1);
        const jwtTokenSave = await jwt.sign({savedForLater: savedForLaterItems}, secret, null);

        return res.json({ save: 'Bearer ' + jwtTokenSave, successMessage: 'Item deleted from saved for later' });
	} catch (err) {
        console.log(err)
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
}

exports.applyCoupon = async (req, res) => {
    const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1] : '';
    const decoded = jwt.decode(token);
    const cartItems = decoded ? decoded.items : [];

    if(cartItems.length === 0) {
        return res.json({ failedMessage: 'Cart is empty! Coupon not applied..' })
    }

	try {
        const checkCoupon = await CouponModel.findOne({ name: req.query.code, exparationDate: { $gt: new Date() } });
        if(!checkCoupon) { return res.json({ failedMessage: 'Invalid coupon!' }) }

        const subtotalBefore = +(Math.round((cartItems.reduce((acc, curr) => acc + curr.total, 0)) + "e+2")  + "e-2");
        const cartSubtotal = checkCoupon.type === 'percent' ? 
            cartItems.reduce((acc, curr) => acc + curr.total, 0) - (cartItems.reduce((acc, curr) => acc + curr.total, 0) * (checkCoupon.value/100)) :
            cartItems.reduce((acc, curr) => acc + curr.total, 0) - checkCoupon.value;
        const tax = +(Math.round((cartSubtotal * 0.17) + "e+2")  + "e-2");
        const cartTotal = +(Math.round((cartSubtotal + tax) + "e+2")  + "e-2");
        
        const cartPrice = { subtotalBefore, subtotal: +(Math.round(cartSubtotal + "e+2")  + "e-2"), total: cartTotal, tax };
        const jwtToken = await jwt.sign({items: cartItems, cartPrice, coupon:{ code: req.query.code, value: checkCoupon.value, type: checkCoupon.type }}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, successMessage: 'Coupon Added' });
	} catch (err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
}

exports.removeCoupon = async (req, res) => {
    const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1] : '';
    const decoded = jwt.decode(token);
    const cartItems = decoded ? decoded.items : [];

	try {

        const subtotalBefore = +(Math.round((cartItems.reduce((acc, curr) => acc + curr.total, 0)) + "e+2")  + "e-2");
        const cartSubtotal = cartItems.reduce((acc, curr) => acc + curr.total, 0);
        const tax = +(Math.round((cartSubtotal * 0.17) + "e+2")  + "e-2");
        const cartTotal = +(Math.round((cartSubtotal + tax) + "e+2")  + "e-2");
        
        const cartPrice = { subtotalBefore, subtotal: +(Math.round(cartSubtotal + "e+2")  + "e-2"), total: cartTotal, tax };
        const jwtToken = await jwt.sign({items: cartItems, cartPrice, coupon:{}}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, successMessage: 'Coupon removed' });
	} catch (err) {
        if (err.errmsg) return res.json({ failedMessage: err.errmsg });
		return res.json({ failedMessage: err.message });
	}
}

const checkCouponObj = async (couponObj) => {
    try {
        if(!couponObj.code) {
            return false;
        }
        const coupon = await CouponModel.findOne({ name: couponObj.code, exparationDate: { $gt: new Date() }});
        if(!coupon) {
            return false;
        }
        return {code: coupon.name, type: coupon.type, value: coupon.value};
    } catch (err) {
        console.log(err)
    }
}
