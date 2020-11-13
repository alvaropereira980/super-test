const request = require('supertest');
const app = require('../app');

/** 
 * Testing get all users enpodint
 * **/

describe('/Get/ Users', () => {
    it('repond with json containing a list of all users', done => {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});
describe('/Get /Users/:id', () => {
    it('respond with json containing a single user', done => {
        request(app)
            .get('/users/U001')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
    it('respond with json "user not found" when the user does not exits', done => {
        request(app)
            .get('/users/noexistingusers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"User not found"')
            .end((error) => {
                if (error) return done(error);
                done();
            });
    });
});
describe('Post /users', () => {
    it('respond with 201 created', done => {
        const data = {
            userName: 'fazt',
            password: 'passw123'
        };
        request(app)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect(201)
            .end(error => {
                if (error) return done(error);
                done();
            });
    });
    it('respond with code 400 on bad request', (done) => {
        const data = {};
        request(app)
            .post("/users")
            .send(data)
            .set("Accept", "application/json")
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"User not created"')
            .end((error) => {
                if (error) return done(error)
                done();
            });
    });
});
