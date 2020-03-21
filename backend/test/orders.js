const supertest = require('supertest');
const server = supertest.agent('http://localhost:5000');

describe('Orders Controller', () => {
	describe('Get Order', () => {
		it('should throw an errors if order not found', done => {
			server
				.get('/order/order')
				.query({ id: '5c7fbe70ef00877b015fc1b7' })
				.expect('Content-type', /json/)
				.end((err, res) => {
					res.status.should.equal(200);
					res.body.failedMessage.should.equal('Order not found');
					done();
				});
		});
	});
	describe('Delete User Order', () => {
		it('should throw an errors if order not deleted', done => {
			server
				.patch('/order/deleteuserorder')
				.query({ id: '5c7fbe70ef00877b015fc1b7' })
				.expect('Content-type', /json/)
				.end((err, res) => {
					res.status.should.equal(200);
					res.body.failedMessage.should.equal('Order not deleted');
					done();
				});
		});
	});
	describe('Update Order', () => {
		it('should throw an errors if id not provided', done => {
			server
				.patch('/order/updateorder')
				.query({})
				.expect('Content-type', /json/)
				.end((err, res) => {
					res.status.should.equal(200);
					res.body.failedMessage.should.equal('ID not provided');
					done();
				});
		});
		it('should throw an errors if value not provided', done => {
			server
				.patch('/order/updateorder')
				.query({ id: '5c7fbe70ef00877b015fc1b7' })
				.expect('Content-type', /json/)
				.end((err, res) => {
					res.status.should.equal(200);
					res.body.failedMessage.should.equal('Value not provided');
					done();
				});
		});
		it('should throw an errors if order not updated', done => {
			server
				.patch('/order/updateorder')
				.query({ id: '5c7fbe70ef00877b015fc1b7', value: 'false' })
				.expect('Content-type', /json/)
				.end((err, res) => {
					res.status.should.equal(200);
					res.body.failedMessage.should.equal('Nothing updated');
					done();
				});
		});
	});
	describe('Get All Orders', () => {
		it('respond with json containing a list of all orders', done => {
			server
				.get('/order/allorders')
				.set('Accept', 'application/json')
				.expect('Content-type', /json/)
				.end((err, res) => {
					res.status.should.equal(200);
					res.body.orders.should.be.an.Array();
					done();
				});
		});
	});
	describe('Delete Order', () => {
		it('should throw an errors if id not provided', done => {
			server
				.delete('/order/deleteorder')
				.query({ id: '' })
				.expect('Content-type', /json/)
				.end((err, res) => {
					res.status.should.equal(200);
					res.body.failedMessage.should.equal('Id not provided');
					done();
				});
		});
		it('should throw an errors if order not deleted', done => {
			server
				.delete('/order/deleteorder')
				.query({ id: '5c7fbe70ef00877b015fc1b7' })
				.expect('Content-type', /json/)
				.end((err, res) => {
					res.status.should.equal(200);
					res.body.failedMessage.should.equal('Order not deleted');
					done();
				});
		});
		// it('should return success if order deleted', (done) => {
		//     server.delete('/order/deleteorder')
		//         .query({ id: '5cfd02adb867fd29b6cd7e81' })
		//         .expect("Content-type",/json/)
		//         .end((err, res) => {
		//             res.status.should.equal(200);
		//             res.body.successMessage.should.equal('Order Deleted');
		//             res.body.orders.should.be.an.Array();
		//             done();
		//         });
		// });
	});
});
