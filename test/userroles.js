const supertest = require("supertest");
const server = supertest.agent("http://localhost:5000");

describe('User Roles Controller', () => {
    describe('Add User Role', () => {
        it('should throw an error if role name is empty', (done) => {
            const req = { name: '' };
            server.post('/rolespermissions/roles/adduserrole')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('Role Name is required !');
                    done();
                });
        });
        it('should throw an error if role exists', (done) => {
            const req = { name: 'Owner' };
            server.post('/rolespermissions/roles/adduserrole')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('E11000 duplicate key error collection: onlineShop.roles index: name_1 dup key: { : "Owner" }');
                    done();
                });
        });
    });
    describe('Get Roles', () => {
        it('respond with json containing a list of all roles', (done) => {
            server.get('/rolespermissions/roles/userroles')
                .set('Accept', 'application/json')
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.should.be.an.Array();
                    done();
                });
        });
    });
});
