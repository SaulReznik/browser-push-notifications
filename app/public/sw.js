console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const { title, body, icon } = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(title, {
    body,
    icon
  });
});