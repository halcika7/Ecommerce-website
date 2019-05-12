const supertest = require("supertest");
const should = require('should');
const server = supertest.agent("http://localhost:5000");

describe('User Controller', () => {
    describe('Login with false usernameEmail and password', () => {
        it('should throw an error if accessing the database fails', (done) => {
            const req = {
                usernameEmail: 'test@test.com',
                password: 'fdgfdg'
            };
            server.post('/api/users/login')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.errors.usernameEmail.should.equal('User not found with that Email or Username');
                    done();
                });
        });
    });

    describe('Register', () => {
        it('should throw an error if accessing the database fails', (done) => {
            const req = {};
            server.post('/api/users/register')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.errors.name.should.equal('Name field is required');
                    res.body.errors.username.should.equal('Username field is required');
                    res.body.errors.email.should.equal('Email is invalid');
                    res.body.errors.password.should.equal('Password must be at least 6 characters');
                    res.body.errors.password2.should.equal('Confirm Password field is required');
                    done();
                });
        });
    });

    describe('Reset Password', () => {
        it('should throw an error if accessing the database fails', (done) => {
            const req = { email: 'test@test.com' };
            server.post('/api/users/resetpassword')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.errors.password.should.equal('Password must be at least 6 characters');
                    res.body.errors.password2.should.equal('Confirm Password field is required');
                    done();
                });
        });
    });

    describe('Get All Users', () => {
        it('respond with json containing a list of all users', (done) => {
            server.get('/api/users/allusers')
                .set('Accept', 'application/json')
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.users.should.be.an.Array();
                    done();
                });
        });
    });
});
