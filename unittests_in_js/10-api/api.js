const express = require("express")

const app = express()
app.use(express.json())
const port = 7865

app.get("/", (req,res) => {
    res.end("Welcome to the payment system")
})


app.get('/cart/:id', (req, res) => {
    const id = req.params.id;
    if (!isNaN(id)) {
        res.status(200).send(`Payment methods for cart ${id}`);
    } else {
        res.status(404).send('Cart not found');
    }
});

app.get("/available_payments", (req, res) => {
    res.json({
      payment_methods: {
        credit_cards: true,
        paypal: false
      }
    });
  });

  app.post('/login', (req, res) => {
    const userName = req.body.userName;
    res.status(200).send(`Welcome ${userName}`)
  });


app.listen(port, () => {
    console.log(`API available on localhost port ${port}`)
})
