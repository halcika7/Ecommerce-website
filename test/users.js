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
        it('should throw an error if user is not found', (done) => {
            const req = { email: 'test@test.com', password: '@Volimtejaa7', password2: '@Volimtejaa7' };
            server.post('/api/users/resetpassword')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('User not found!');
                    done();
                });
        });
        it('should throw an error if provided password is already in use', (done) => {
            const req = { email: 'halcika_7@hotmail.com', password: '@Volimtejaa7', password2: '@Volimtejaa7' };
            server.post('/api/users/resetpassword')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('Provided password is already in use');
                    done();
                });
        });
    });

    describe('Update Profile Picture', () => {
        it('should throw an error if provided file path equals to user.pprofilePicture', (done) => {
            const req = { username: 'halcika_7',
                file: { 
                    fieldname: 'profilePicture',
                    originalname: 'imac-gallery5-201706.jpeg',
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    destination: 'public/images/users/halcika_7/',
                    filename: 'imac-gallery5-201706.jpeg',
                    path: 'public/images/users/halcika_7/imac-gallery5-201706.jpeg',
                    size: 345625 
            }};
            server.put('/api/users/updateprofilepicture')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('Selected picture is same as the one u already use !');
                    done();
                });
        });
        it('should throw an error if user not found', (done) => {
            const req = { username: 'halci',
                file: { 
                    fieldname: 'profilePicture',
                    originalname: 'imac-gallery5-201706.jpeg',
                    encoding: '7bit',
                    mimetype: 'image/jpeg',
                    destination: 'public/images/users/halcika_7/',
                    filename: 'imac-gallery5-201706.jpeg',
                    path: 'public/images/users/halcika_7/imac-gallery5-201706.jpeg',
                    size: 345625 
            }};
            server.put('/api/users/updateprofilepicture')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('User not found');
                    done();
                });
        });
    });

    describe('Get Profile Picture', () => {
        it('should throw an error if user not found', (done) => {
            const req = { username: 'halcika_7'};
            server.get('/api/users/getuserphoto')
                .send(req)
                .query({ _id: null })
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('User not found');
                    done();
                });
        });
    });

    describe('Update Password', () => {
        it('should throw an error for validating passwords', (done) => {
            const req = { username: 'halcika_7', password: '', password2: ''};
            server.put('/api/users/updatepassword')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.errors.password.should.equal('Password must be at least 6 characters');
                    res.body.errors.password2.should.equal('Confirm Password field is required');
                    done();
                });
        });
        it('should throw an error if user not found', (done) => {
            const req = { username: 'halc', password: '@Volimtejaa7', password2: '@Volimtejaa7'};
            server.put('/api/users/updatepassword')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('User not found!');
                    done();
                });
        });
        it('should throw an error if password is in use', (done) => {
            const req = { username: 'halcika_7', password: '@Volimtejaa7', password2: '@Volimtejaa7'};
            server.put('/api/users/updatepassword')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('Provided password is already in use');
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

    describe('Get User', () => {
        it('should thorw an error id!==id2 profile!==false', (done) => {
            server.get('/api/users/singleuser')
                .set('Accept', 'application/json')
                .query({ profile:true, id:"", id2: 'sdgg' })
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.error.should.equal("Please do not use other id's");
                    done();
                });
        });
        it('should thorw an error if invalid _id provided', (done) => {
            server.get('/api/users/singleuser')
                .set('Accept', 'application/json')
                .query({ profile:true, id:"sdgg", id2: 'sdgg' })
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal("Argument passed in must be a single String of 12 bytes or a string of 24 hex characters");
                    done();
                });
        });
        it('should thorw an error if user not found', (done) => {
            server.get('/api/users/singleuser')
                .set('Accept', 'application/json')
                .query({ profile:true, id:"5c7fbe70ef00877b015fc1b5", id2: '5c7fbe70ef00877b015fc1b5' })
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal("User not found");
                    done();
                });
        });
    });
});
