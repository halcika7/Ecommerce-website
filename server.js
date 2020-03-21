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
require('./backend/cronJobs/product').dailyWeeklyOffer;

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'backend/public')));
app.use(bodyParser.json());

const db = require('./backend/config/keys').mongoURI;

app.use(passport.initialize());

// Passport Config
require('./backend/config/passport')(passport);

// routes
app.use('/api/users', require('./backend/routes/api/users'));
app.use('/rolespermissions/permissions', require('./backend/routes/roles&permissions/permissions'));
app.use('/rolespermissions/roles', require('./backend/routes/roles&permissions/roles'));
app.use('/products/category', require('./backend/routes/products/category'));
app.use('/products/categoryicon', require('./backend/routes/products/categoryIcon'));
app.use('/products/brand', require('./backend/routes/products/brand'));
app.use('/products/product', require('./backend/routes/products/product'));
app.use('/products/product/filter', require('./backend/routes/products/filterproducts'));
app.use('/products/product', require('./backend/routes/products/productreview')(io));
app.use('/answers/', require('./backend/routes/answers/answers'));
app.use('/terms/', require('./backend/routes/answers/terms'));
app.use('/cart/', require('./backend/routes/cart/cart'));
app.use('/cart/coupon/', require('./backend/routes/cart/coupon'));
app.use('/cart/checkout/', require('./backend/routes/cart/checkout'));
app.use('/stores/', require('./backend/routes/stores/stores'));
app.use('/order/', require('./backend/routes/orders/orders'));
app.use('/dashboard/', require('./backend/routes/dashboard/dashboard'));

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
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('MongoDB connected !');
	})
	.catch(err => console.log(err));

server.listen(port, () => console.log(`Server running on port ${port}`));
