const express = require('express');
const req_handler = express.Router();
const Post = require('../models/Post');

// default response

req_handler.get('/', (req, res) => {
    res.send('Welcome to Cooper Wineberg\'s Test Project.\nBuild a HTTP REST API in {Java|Node.js|Python} for a service that ingests and returns customer data')
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
        } catch (err) {
            res.status(500).json({
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
            res.response(500).json({
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
        res.response(500).json({
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
        res.response(500).json({
            message: err
        })
    }
});

module.exports = req_handler;