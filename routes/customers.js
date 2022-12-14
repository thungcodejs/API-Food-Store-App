const { Customer } = require('../models/customer');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get(`/`, async (req, res) => {
    const customerList = await Customer.find().select('-passwordHash');

    if (!customerList) {
        res.status(500).json({ success: false })
    }
    res.send(customerList);
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id).select('-passwordHash');

    if (!customer) {
        res.status(500).json({ message: 'The customer with the given ID was not found.' })
    }
    res.status(200).send(customer);
})


// post customer
router.post('/', async (req, res) => {
    let customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })
    customer = await customer.save();

    if (!customer)
        return res.status(400).send('the customer cannot be created!')
    res.send(customer);
})


router.post('/login', async (req, res) => {
    const customer = await Customer.findOne({ email: req.body.email })
    const secret = process.env.secret;
    if (!customer) {
        return res.status(400).send('The customer not found');
    }

    if (customer && bcrypt.compareSync(req.body.password, customer.passwordHash)) {
        const token = jwt.sign(
            {
                customerId: customer.id,
                isAdmin: customer.isAdmin
            },
            secret,
            { expiresIn: '1d' }
        )

        res.status(200).send({ customer: customer.email, token: token })
    } else {
        res.status(400).send('password is wrong!');
    }
})

router.post('/register', async (req, res) => {
    let customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })
    customer = await customer.save();

    if (!customer)
        return res.status(400).send('the customer cannot be created!')

    res.send(customer);
})


router.delete('/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then(customer => {
        if (customer) {
            return res.status(200).json({ success: true, message: 'the customer is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "customer not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})



// count customer
router.get(`/get/count`, async (req, res) => {
    const customerCount = await Customer.countDocuments();

    if (!customerCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        customerCount: customerCount
    });
})


module.exports = router;