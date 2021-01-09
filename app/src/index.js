import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {  
  registerServiceWorker, 
  urlBase64ToUint8Array } from './helpers';
import { token, publicVapidKey } from './config';

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
  console.log(subscription);

  await fetch(`http://localhost:6789/api/v1/notifications/subscribe`, {
      method: 'POST',
      headers: {
          'authorization': token,
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
