const express = require('express');
const webpush = require('web-push');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const publicKey = 'BHyjMDtiTbJCUBZju7EM5cUSua51cBDU9w3BOfnLR5Sb-JataSWc_McO0R-Y1OuX6yCy6JrfonJVSfleb8mgy0A';
const privateKey = 'wife8AoB-bjzXdh9QgEJrDCuwnRYAbYVhFHQoRSNSxk';

console.log(publicKey);

webpush.setVapidDetails(
    'mailto:robhov97@gmail.com',
    publicKey,
    privateKey
);
let subscription;
// Subscribe Route
app.post('/subscribe', (req, res) => {
    // Getting the subscribtion object
    subscription = req.body;

    //creating payload
    const payload = JSON.stringify({
        title: 'Picsart Booking',
        body: 'Notifications for Picsart booking is registrated',
        icon: 'https://seeklogo.com/images/P/picsart-icon-logo-EE8CEAAED8-seeklogo.com.png'
    });

    webpush.sendNotification(subscription, payload)
        .catch(err => console.log(err));

    // sending response that resource was succesfuly created
    res.status(201).json(JSON.stringify(subscription));
});

app.post('/anotherOne', (req, res) => {

    res.status(201).json({});

    const payload = JSON.stringify({
        title: 'Another One',
        body: 'Another One',
        icon: 'https://www.dictionary.com/e/wp-content/uploads/2018/04/another-one.jpg'
    });

    webpush.sendNotification(subscription, payload)
      .catch(err => console.log(err));
})

setTimeout(() => {
    const payload = JSON.stringify({
        title: 'Notification from server',
        body: 'NOtification from server',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/The.Matrix.glmatrix.2.png'
    });
    console.log('server side notificaton');
    webpush.sendNotification(subscription, payload)
    .catch(err => console.log(err));
}, 10000)

const PORT = 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
