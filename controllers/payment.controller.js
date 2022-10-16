const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const makePayment = async (req, res) => {
    const product = await stripe.products.create({
        name: 'Sample',
    });
    // console.log(product);
    const price = await stripe.prices.create({
        unit_amount: req.body.price * 100,
        currency: 'INR',
        product: `${product.id}`,
    });
    // console.log(price);
    const paymentLink = await stripe.paymentLinks.create({
        line_items: [{
            price: `${price.id}`
            , quantity: 1
        }],
    });
    res.send({ stripe: paymentLink });
}

module.exports = { makePayment };