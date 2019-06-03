const ProductModel = require('../models/Product');
const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secretOrKey;

exports.addToCart = async (req, res) => {
    const sku = req.query.sku;
    const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1].slice(0,-3) : '';
    const decoded = jwt.decode(token);
    const cartItems = decoded ? decoded.items : [];
    const findIndex = cartItems.findIndex(item => item.sku === sku);

    if(findIndex !== -1) { return res.json({ failedMessage: 'Item already in cart' }); }

	try {
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

        const cartSubtotal = parseFloat(parseFloat(cartItems.reduce((acc, curr) => acc + curr.total, 0)).toFixed(2));
        const tax = parseFloat(parseFloat(cartSubtotal * 0.17).toFixed(2));
        const cartTotal = parseFloat(parseFloat(cartSubtotal + tax).toFixed(2));

        const cartPrice = { subtotal: cartSubtotal, total: cartTotal, tax };

        const jwtToken = await jwt.sign({items: cartItems, cartPrice}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, successMessage: 'Item added to cart' });
	} catch (err) {
		console.log(err)
	}
}

exports.deleteFromCart = async (req, res) => {
    try {
        const sku = req.query.sku;
        const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1].slice(0,-3) : '';
        const decoded = jwt.decode(token);
        const cartItems = decoded ? decoded.items : [];
        const findIndex = cartItems.findIndex(item => item.sku === sku);

        if(findIndex === -1) { return res.json({ failedMessage: 'Item not in cart' }); }

        cartItems.splice(findIndex, 1);
    
        const cartSubtotal = parseFloat(parseFloat(cartItems.reduce((acc, curr) => acc + curr.total, 0)).toFixed(2));
        const tax = parseFloat(parseFloat(cartSubtotal * 0.17).toFixed(2));
        const cartTotal = parseFloat(parseFloat(cartSubtotal + tax).toFixed(2));

        const cartPrice = { subtotal: cartSubtotal, total: cartTotal, tax };

        const jwtToken = await jwt.sign({items: cartItems, cartPrice}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, successMessage: 'Item deleted from cart' });
    }catch (err) {
        console.log(err)
    }
}

exports.updateCartItem = async (req, res) => {
    const sku = req.query.sku;
    const value = JSON.parse(req.query.value);
    const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1].slice(0,-3) : '';
    const decoded = jwt.decode(token);
    const cartItems = decoded ? decoded.items : [];
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
        
        const cartSubtotal = parseFloat(parseFloat(updatedCartItems.reduce((acc, curr) => acc + curr.total, 0)).toFixed(2));
        const tax = parseFloat(parseFloat(cartSubtotal * 0.17).toFixed(2));
        const cartTotal = parseFloat(parseFloat(cartSubtotal + tax).toFixed(2));

        const cartPrice = { subtotal: cartSubtotal, total: cartTotal, tax };

        const jwtToken = await jwt.sign({items: updatedCartItems, cartPrice}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, successMessage: 'Item quantity updated' });
	} catch (err) {
		console.log(err)
	}
}

exports.moveToSaveForLater = async (req, res) => {
    const sku = req.query.sku;
    const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1].slice(0,-3) : '';
    const tokenSave = req.query.saveForLaterItems !== "null" ? req.query.saveForLaterItems.split(' ')[1].slice(0,-3) : '';
    const decodedCartItems = jwt.decode(token);
    const decodedSaveForLaterItems = jwt.decode(tokenSave);
    const cartItems = decodedCartItems ? decodedCartItems.items : [];
    const savedForLaterItems = decodedSaveForLaterItems ? decodedSaveForLaterItems.savedForLater : [];
    const findIndex = cartItems.findIndex(item => item.sku === sku);
    const findIndexSave = savedForLaterItems.findIndex(item => item.sku === sku);

    if(findIndex === -1) { return res.json({ failedMessage: 'Item not in Cart' }); }
    if(findIndexSave !== -1) { return res.json({ failedMessage: 'Item already Saved for later' }); }

	try {
        const newSavedProduct = {...cartItems[findIndex], total:cartItems[findIndex].total/cartItems[findIndex].quantity, quantity: 1};
        cartItems.splice(findIndex, 1);
        savedForLaterItems.push(newSavedProduct);

        const cartSubtotal = parseFloat(parseFloat(cartItems.reduce((acc, curr) => acc + curr.total, 0)).toFixed(2));
        const tax = parseFloat(parseFloat(cartSubtotal * 0.17).toFixed(2));
        const cartTotal = parseFloat(parseFloat(cartSubtotal + tax).toFixed(2));

        const cartPrice = { subtotal: cartSubtotal, total: cartTotal, tax };

        const jwtToken = await jwt.sign({items: cartItems, cartPrice, savedForLater: savedForLaterItems}, secret, null);
        const jwtTokenSave = await jwt.sign({savedForLater: savedForLaterItems}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, save: 'Bearer ' + jwtTokenSave, successMessage: 'Item moved to save for later' });
	} catch (err) {
		console.log(err)
	}
}

exports.moveToCart = async (req, res) => {
    const sku = req.query.sku;
    const token = req.query.cartItems !== 'null' ? req.query.cartItems.split(' ')[1].slice(0,-3) : '';
    const tokenSave = req.query.saveForLaterItems !== "null" ? req.query.saveForLaterItems.split(' ')[1].slice(0,-3) : '';
    const decodedCartItems = jwt.decode(token);
    const decodedSaveForLaterItems = jwt.decode(tokenSave);
    const cartItems = decodedCartItems ? decodedCartItems.items : [];
    const savedForLaterItems = decodedSaveForLaterItems ? decodedSaveForLaterItems.savedForLater : [];
    const findIndex = cartItems.findIndex(item => item.sku === sku);
    const findIndexSave = savedForLaterItems.findIndex(item => item.sku === sku);

    if(findIndex !== -1) { return res.json({ failedMessage: 'Item already in Cart' }); }
    if(findIndexSave === -1) { return res.json({ failedMessage: 'Item not saved for later' }); }

	try {
        const newCartProduct = {...savedForLaterItems[findIndexSave]};
        cartItems.push(newCartProduct);
        savedForLaterItems.splice(findIndexSave, 1);

        const cartSubtotal = parseFloat(parseFloat(cartItems.reduce((acc, curr) => acc + curr.total, 0)).toFixed(2));
        const tax = parseFloat(parseFloat(cartSubtotal * 0.17).toFixed(2));
        const cartTotal = parseFloat(parseFloat(cartSubtotal + tax).toFixed(2));

        const cartPrice = { subtotal: cartSubtotal, total: cartTotal, tax };

        const jwtToken = await jwt.sign({items: cartItems, cartPrice, savedForLater: savedForLaterItems}, secret, null);
        const jwtTokenSave = await jwt.sign({savedForLater: savedForLaterItems}, secret, null);

        return res.json({ token: 'Bearer ' + jwtToken, save: 'Bearer ' + jwtTokenSave, successMessage: 'Item moved to cart' });
	} catch (err) {
		console.log(err)
	}
}

exports.deleteFromSavedForLater = async (req, res) => {
    const sku = req.query.sku;
    const tokenSave = req.query.saveForLaterItems !== "null" ? req.query.saveForLaterItems.split(' ')[1].slice(0,-3) : '';
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
	}
}
