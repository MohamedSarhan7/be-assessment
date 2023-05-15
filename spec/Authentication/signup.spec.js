const request = require('supertest');
const app = require('../../index');

const user = {
    "fullname": "test name",
    "email": "mohamed123@abc.com",
    "password1": "Mo7amed7#",
    "password2": "Mo7amed7#"


}
describe('POST /api/v1/auth/register', () => {

    it('responds with 201 status code', (done) => {
        request(app).post('/api/v1/auth/register')

            .send({ json: true, body: { user } })
            .expect(201)
            .end((error) => (error) ? done.fail(error) : done());
    });

    // empty body
    it('responds with 400 status code', (done) => {
        request(app).post('/api/v1/auth/register')

            .send({ json: true, body: {} })
            .expect(400)
            .end((error) => (error) ? done.fail(error) : done());
    });

    // fullname length
    it('responds with 400 status code', (done) => {
        request(app).post('/api/v1/auth/register')

            .send({ json: true, body: { ...user, fullname: "bb" } })
            .expect(400)
            .end((error) => (error) ? done.fail(error) : done());
    });
    //  invalid email
    it('responds with 400 status code', (done) => {
        request(app).post('/api/v1/auth/register')

            .send({ json: true, body: { ...user, email: "abc" } })
            .expect(400)
            .end((error) => (error) ? done.fail(error) : done());
    });

    // password does not match
    it('responds with 400 status code', (done) => {
        request(app).post('/api/v1/auth/register')

            .send({ json: true, body: { ...user, password2: "mohamed" } })
            .expect(400)
            .end((error) => (error) ? done.fail(error) : done());
    });

});

