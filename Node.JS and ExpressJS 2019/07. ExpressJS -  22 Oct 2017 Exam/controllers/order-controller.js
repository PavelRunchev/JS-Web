const Order = require('../models/Order');
const Product = require('../models/Product');

module.exports = {
    customizeOrder: (req, res) => {
        const productId = req.params.id;
        Product.findById(productId).then((product) => {
            let productToppings = [
                { 'pickle': false },
                { 'tomato': false },
                { 'onion': false },
                { 'lettuce': false },
                { 'hot sauce': false },
                { 'extra sauce': false }
            ];
            for (let t of product.toppings) {
                productToppings[t] = true;
            }

            productToppings['hotSauce'] = productToppings['hot sauce'];
            productToppings['extraSauce'] = productToppings['extra sauce'];
            product.productToppings = productToppings;
            res.render('order/customize-order', product);
        }).catch(err => console.log(err.message));
    },

    orderPlaced: (req, res) => {
        const productId = req.body.product_id;
        let toppingsBody = req.body;
        delete toppingsBody.product_id;

        //from array Objects to Array Strings!
        const toppings = Object.keys(toppingsBody);
        const newOrdered = {
            creator: req.user.id,
            product: productId,
            toppings: toppings,
            status: 'Pending'
        };

        Order.create(newOrdered).then((place) => {
            Product.findById(place.product).select('category size').then((pro) => {
                place.data = convertDate(place.date);
                place.pending = place.status === 'Pending';
                place.inProgress = place.status === 'In progress';
                place.inTransit = place.status === 'In transit';
                place.delivered = place.status === 'Delivered';

                res.render('order/order-details', place);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    },

    orderStatus: (req, res) => {
        const creatorId = req.user.id;
        Order
            .find({ creator: creatorId })
            .populate('product')
            .then((orders) => {
                if (orders.length === 0) {
                    const noOrders = true;
                    res.render('order/order-status', { noOrders });
                    return;
                }

                orders.map(o => o.data = convertDate(o.date));
                res.render('order/order-status', { orders });
            }).catch(err => console.log(err));
    },

    details: (req, res) => {
        const orderId = req.params.id;
        Order.findById(orderId).populate('product').then((ord) => {
            ord.data = convertDate(ord.date);
            ord = getStatus(ord);
            res.render('order/order-details', ord);
        }).catch(err => console.log(err.message));
    },

    allOrders: async(req, res) => {
        try {
            let orders = await Order.find({}).populate('product');
            orders.map(o => {
                o.data = convertDate(o.date);
                o = getStatus(o);
            });
            res.render('order/all-orders', { orders });

        } catch (err) {
            console.log(err.message);
        }
    },

    saveChanges: async(req, res) => {
        let saveChangesOrder = req.body;
        try {
            for (const key in saveChangesOrder) {
                const orderId = key;
                const status = saveChangesOrder[key];
                await Order.findOneAndUpdate({ _id: orderId }, { status: status });
            }

            let orders = await Order.find({}).populate('product');
            orders.map(o => {
                o.data = convertDate(o.date);
                o = getStatus(o);
            });
            res.render('order/all-orders', { orders });
        } catch (err) {
            console.log(err.message);
        }
    }
};

function convertDate(value) {
    const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let day = new Date(value).getUTCDate();
    let month = new Date(value).getUTCMonth() + 1;
    let year = new Date(value).getUTCFullYear();
    let minutes = new Date(value).getUTCMinutes();
    let hours = new Date(value).getUTCHours();
    let week = weeks[new Date(value).getDay()];
    if (day < 10)
        day = '0' + day;
    if (month < 10)
        month = '0' + month;
    if (hours < 10)
        hours = '0' + hours;
    if (minutes < 10)
        minutes = '0' + minutes;

    return `${day} ${week} ${month} ${year} - ${hours}:${minutes}`;
}

function getStatus(obj) {
    obj.pending = obj.status === 'Pending';
    obj.inProgress = obj.status === 'In progress';
    obj.inTransit = obj.status === 'In transit';
    obj.delivered = obj.status === 'Delivered';
    return obj;
}