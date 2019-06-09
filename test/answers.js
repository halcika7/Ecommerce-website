const supertest = require("supertest");
const server = supertest.agent("http://localhost:5000");

describe('Answers Controller', () => {
    describe('Add Answer', () => {
        it('should throw an errors if validation fails', (done) => {
            const req = { question: '', answer: '' }
            server.post('/answers/addanswer')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.errors.question.should.equal('Question field is required');
                    res.body.errors.answer.should.equal('Answer field is required');
                    done();
                });
        });
        it('should throw an errors if validation min length fails', (done) => {
            const req = { question: 'sfsdf', answer: 'sdfdf' }
            server.post('/answers/addanswer')
                .send(req)
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.errors.question.should.equal('Question min length 10');
                    res.body.errors.answer.should.equal('Answer min length 10');
                    done();
                });
        });
    });
    describe('Delete Answer', () => {
        it('should throw an errors if answer not deleted', (done) => {
            server.delete('/answers/deleteanswer')
                .query({ id: '5c7fbe70ef00877b015fc1b7' })
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('Answer not deleted');
                    done();
                });
        });
    });
    describe('Update Answer', () => {
        it('should throw an errors if answer not updated', (done) => {
            let object = { question: 'vfsdfgfdgsdgdsfgdsfg', answer: 'sdfuisdjf'  };
            object = JSON.stringify(object);
            server.patch('/answers/updateanswer')
                .query({ id: '5cf4740dd0f30edb8db4e149', object })
                .expect("Content-type",/json/)
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.failedMessage.should.equal('Question already answered !');
                    done();
                });
        });
    });
});