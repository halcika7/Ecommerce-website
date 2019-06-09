const supertest = require("supertest");
const server = supertest.agent("http://localhost:5000");

describe('Terms Controller', () => {
    describe('Add Term', () => {
        it('should throw an errors if term and text is empty', (done) => {
            const req = { term: '', text: '' };
            server.post('/terms/addterm')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.errors.term.should.equal('Term field is required');
                    res.body.errors.text.should.equal('Text field is required');
                    done();
                });
        });
        it('should throw an errors if term and text length is less than 10 and text is empty', (done) => {
            const req = { term: 'hashdas', text: 'adasdas' };
            server.post('/terms/addterm')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.errors.term.should.equal('Term min length 10');
                    res.body.errors.text.should.equal('Text min length 10');
                    done();
                });
        });
    });
    describe('Get Term', () => {
        it('should throw an errors if term not found', (done) => {
            server.get('/terms/getterm')
                .query({ id: '5c7fbe70ef00877b015fc1b7' })
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('Answer not found');
                    done();
                });
        });
    });
    describe('Get All Terms', () => {
        it('respond with json containing a list of all roles', (done) => {
            server.get('/terms/getallterms')
                .set('Accept', 'application/json')
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.terms.should.be.an.Array();
                    done();
                });
        });
    });
    describe('Delete Term', () => {
        it('should throw an errors if term not deleted', (done) => {
            server.delete('/terms/deleteterm')
                .query({ id: '5c7fbe70ef00877b015fc1b7' })
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('No Terms deleted');
                    done();
                });
        });
    });
    describe('Update Term', () => {
        it('should throw an errors if term not deleted', (done) => {
            let object = { term:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', text: 'fsdsf'};
            object = JSON.stringify(object);
            server.patch('/terms/updateterm')
                .query({ id: '5cf471331f863cd938b6b507', object })
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('Term already added!');
                    done();
                });
        });
    });
});
