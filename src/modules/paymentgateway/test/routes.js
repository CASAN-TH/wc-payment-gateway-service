'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Paymentgateway = mongoose.model('Paymentgateway');

var credentials,
    token,
    mockup;

describe('Paymentgateway CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            title: 'Direct bank transfer',
            description: 'Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order wont be shipped until the funds have cleared in our account.',
            order: 0,
            enabled: true,
            method_title: 'BACS',
            method_description: 'Allows payments by BACS, more commonly known as direct bank/wire transfer.',
            method_supports: 'products',
            settings: {
                id: 'title',
                label: 'Title',
                description: 'This controls the title which the user sees during checkout.',
                type: 'text',
                value: 'Direct bank transfer',
                default: 'Direct bank transfer',
                tip: 'This controls the title which the user sees during checkout.',
                placeholder: ''
            }

        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Paymentgateway get use token', (done)=>{
        request(app)
        .get('/api/paymentgateways')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res)=>{
            if (err) {
                return done(err);
            }
            var resp = res.body;
            done();
        });
    });

    it('should be Paymentgateway get by id', function (done) {

        request(app)
            .post('/api/paymentgateways')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/paymentgateways/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.title, mockup.title);
                        assert.equal(resp.data.description, mockup.description);
                        assert.equal(resp.data.order, mockup.order);
                        assert.equal(resp.data.enabled, mockup.enabled);
                        assert.equal(resp.data.method_title, mockup.method_title);
                        assert.equal(resp.data.method_description, mockup.method_description);
                        assert.equal(resp.data.method_supports, mockup.method_supports);

                        assert.equal(resp.data.settings.id, mockup.settings.id);
                        assert.equal(resp.data.settings.label, mockup.settings.label);
                        assert.equal(resp.data.settings.description, mockup.settings.description);
                        assert.equal(resp.data.settings.type, mockup.settings.type);
                        assert.equal(resp.data.settings.value, mockup.settings.value);
                        assert.equal(resp.data.settings.default, mockup.settings.default);
                        assert.equal(resp.data.settings.tip, mockup.settings.tip);
                        assert.equal(resp.data.settings.placeholder, mockup.settings.placeholder);

                        done();
                    });
            });

    });

    it('should be Paymentgateway post use token', (done)=>{
        request(app)
            .post('/api/paymentgateways')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.title, mockup.title);
                assert.equal(resp.data.description, mockup.description);
                assert.equal(resp.data.order, mockup.order);
                assert.equal(resp.data.enabled, mockup.enabled);
                assert.equal(resp.data.method_title, mockup.method_title);
                assert.equal(resp.data.method_description, mockup.method_description);
                assert.equal(resp.data.method_supports, mockup.method_supports);

                assert.equal(resp.data.settings.id, mockup.settings.id);
                assert.equal(resp.data.settings.label, mockup.settings.label);
                assert.equal(resp.data.settings.description, mockup.settings.description);
                assert.equal(resp.data.settings.type, mockup.settings.type);
                assert.equal(resp.data.settings.value, mockup.settings.value);
                assert.equal(resp.data.settings.default, mockup.settings.default);
                assert.equal(resp.data.settings.tip, mockup.settings.tip);
                assert.equal(resp.data.settings.placeholder, mockup.settings.placeholder);
                done();
            });
    });

    it('should be paymentgateway put use token', function (done) {

        request(app)
            .post('/api/paymentgateways')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    title: 'Direct transfer',
                    description: 'Make your payment directly into our bank account.',
                    order: 1,
                    enabled: false,
                    method_title: 'BACSs',
                    method_description: 'Allows payments by BACK.',
                    method_supports: 'productss',
                    settings: {
                        id: 'titlee',
                        label: 'Titlee',
                        description: 'Thiss controls the title which the user sees during checkout.',
                        type: 'email',
                        value: 'Direct transfer',
                        default: 'Direct transfer',
                        tip: 'Thiss controls the title which the user sees during checkout.',
                        placeholder: ''
                    }
                }
                request(app)
                    .put('/api/paymentgateways/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.title, update.title);
                        assert.equal(resp.data.description, update.description);
                        assert.equal(resp.data.order, update.order);
                        assert.equal(resp.data.enabled, update.enabled);
                        assert.equal(resp.data.method_title, update.method_title);
                        assert.equal(resp.data.method_description, update.method_description);
                        assert.equal(resp.data.method_supports, update.method_supports);

                        assert.equal(resp.data.settings.id, update.settings.id);
                        assert.equal(resp.data.settings.label, update.settings.label);
                        assert.equal(resp.data.settings.description, update.settings.description);
                        assert.equal(resp.data.settings.type, update.settings.type);
                        assert.equal(resp.data.settings.value, update.settings.value);
                        assert.equal(resp.data.settings.default, update.settings.default);
                        assert.equal(resp.data.settings.tip, update.settings.tip);
                        assert.equal(resp.data.settings.placeholder, update.settings.placeholder);
                        done();
                    });
            });

    });

    it('should be paymentgateway delete use token', function (done) {

        request(app)
            .post('/api/paymentgateways')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/paymentgateways/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be paymentgateway get not use token', (done)=>{
        request(app)
        .get('/api/paymentgateways')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    it('should be paymentgateway post not use token', function (done) {

        request(app)
            .post('/api/paymentgateways')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be paymentgateway put not use token', function (done) {

        request(app)
            .post('/api/paymentgateways')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/paymentgateways/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be paymentgateway delete not use token', function (done) {

        request(app)
            .post('/api/paymentgateways')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/paymentgateways/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Paymentgateway.remove().exec(done);
    });

});