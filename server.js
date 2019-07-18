const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const app = express();
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);
// cron jobs
const dailyWeeklyOffer = require('./cronJobs/product').dailyWeeklyOffer;

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// routes
app.use('/api/users', require('./routes/api/users'));
app.use('/rolespermissions/permissions', require('./routes/roles&permissions/permissions'));
app.use('/rolespermissions/roles', require('./routes/roles&permissions/roles'));
app.use('/products/category', require('./routes/products/category'));
app.use('/products/categoryicon', require('./routes/products/categoryIcon'));
app.use('/products/brand', require('./routes/products/brand'));
app.use('/products/product', require('./routes/products/product'));
app.use('/products/product/filter', require('./routes/products/filterproducts'));
app.use('/products/product', require('./routes/products/productreview')(io));
app.use('/answers/', require('./routes/answers/answers'));
app.use('/terms/', require('./routes/answers/terms'));
app.use('/cart/', require('./routes/cart/cart'));
app.use('/cart/coupon/', require('./routes/cart/coupon'));
app.use('/cart/checkout/', require('./routes/cart/checkout'));
app.use('/stores/', require('./routes/stores/stores'));
app.use('/order/', require('./routes/orders/orders'));
app.use('/dashboard/', require('./routes/dashboard/dashboard'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

const port = process.env.PORT || 5000;

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('MongoDB connected !');
	})
	.catch(err => console.log(err));

server.listen(port, () => console.log(`Server running on port ${port}`));
