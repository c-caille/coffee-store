//sk_test_51MEe0LClv3lkhEdCqCcNL8UTQa3zjiFBmdMuf5RxYeBhq0mMvxB4OGdaZMEys2K1PihvsWDhydpIqm882IVxHTgf00CKHQTqyU
//Coffee: price_1MEe2NClv3lkhEdCHX3Sw0b9
//Filters: price_1MEe3XClv3lkhEdCDQfLwABe
//Cups: price_1MEe44Clv3lkhEdCRUg4QGFI

const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51MEe0LClv3lkhEdCqCcNL8UTQa3zjiFBmdMuf5RxYeBhq0mMvxB4OGdaZMEys2K1PihvsWDhydpIqm882IVxHTgf00CKHQTqyU')

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
/*
req.body.items [{id:1, quantity: 3}]
stripe wants [{price 1, quantity: 3}]
*/
    const items = req.body.items;
    let lineItems = [];
    items.forEach((items) => {
        lineItems.push(
            {price: items.id,
            quantity: items.quantity
            }
            )
    })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url:session.url
    }))

})

app.listen(4000, () => console.log('Listening on port 4000'))