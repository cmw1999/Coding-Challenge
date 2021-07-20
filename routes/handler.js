const express = require('express');
const req_handler = express.Router();
const Post = require('../models/Post');

// default response

req_handler.get('/', (req, res) => {
    res.send('Welcome to Cooper Wineberg\'s Test Project.\nBuild a HTTP REST API in {Java|Node.js|Python} for a service that ingests and returns customer data\n' + 
        'Gets\n' +
        '/                             Default page\n' +
        '/ customers                    Returns HTTP 200 OK with a JSON\n' +
        'response containing all customer data\n' +
        '/ customers ? city = "Some City"   Returns a HTTP 200 OK with a JSON\n' +
        'response body containing only customers\n' +
        'that live in a specified city.\n' +
        '/ customers / { customerId }       Returns HTTP 200 OK with a JSON\n' +
        'response containing customer data\n' +
        'for the specified customer.\n\n' +
        '/customers                    Returns a HTTP 200 OK with a JSON \n' +
        '                              response body including the customer\n' +
        '                              data and its identifier provided by\n' +
        '                              the persistent data store.\n' +
        '                              Body must be json.\n')
});

// GET /customers

req_handler.get('/customers', (req, res, next) => {
    var query = req.query.city;
    console.log(query);
    if (query != undefined) {
        query = { City: { '$in': req.query.city.replace(/['"]+/g, '') } };
        try {
            Post.find(query).then(data => {
                res.status(200).json(data);
            })
        } catch (err) { // no 400 for user not found
            res.status(400).json({
                message: err
            })
        }
    }
    else {
        try {
            Post.find().then(data => {
                res.status(200).json(data);
            })
        } catch (err) {
            res.response(400).json({
                message: err
            })
        }
    }
    console.log(query);
        
});

// POST /customers

req_handler.post('/customers', (req, res) => {
    const post = new Post({
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Email: req.body.Email,
        Address: req.body.Address,
        City: req.body.City,
        State: req.body.State,
        Zip: req.body.Zip
    });
    console.log(req.body);
    post.save().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.response(400).json({
            message: err
        })
    })
});

// GET /customers/{customerId}

req_handler.get('/customers/:customerID', (req, res) => {
    try {
        Post.findById(req.params.customerID).then(data => {
            res.status(200).json(data);
        })
    } catch (err) {
        res.response(400).json({
            message: err
        })
    }
});

module.exports = req_handler;
