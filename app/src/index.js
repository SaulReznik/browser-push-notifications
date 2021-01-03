import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {  
  registerServiceWorker, 
  urlBase64ToUint8Array } from './helpers';

const publicVapidKey = 'BDK-Vkvwx1D6x6boninVu91nzESWKpDGKw-MB4p5jvO95om1lJhsjINNckZMXt7l3jL71bGtN-MhfvmfsKHg6Ic';
//const publicVapidKey = 'BHyjMDtiTbJCUBZju7EM5cUSua51cBDU9w3BOfnLR5Sb-JataSWc_McO0R-Y1OuX6yCy6JrfonJVSfleb8mgy0A';

// Register SW, register Push API, Send Push
const send = async () => {
  //Register Service Worker
  console.log('Registering service worker...');

  const registion = await registerServiceWorker('/sw.js');

  console.log('Service Worker Registered...');

  //Register Push
  console.log('Register Push');
  const subscription = await registion.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('Push Registred');

  //Send push notification
  console.log('Sending Push...');
  console.log(subscription); // subscription object is not empty here
  const user_id = '5fedc679f414663c693cf549';
  await fetch(`http://localhost:6789/api/v1/notifications/subscribe/${user_id}`, {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(subscription),
  });
  console.log('Push sent...');
};


//Check for service worker
if('serviceWorker' in navigator && 'PushManager' in window) {
  send().catch(err => console.error(err));
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
