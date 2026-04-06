self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  event.waitUntil(
    self.registration.showNotification(data.title ?? 'Bolo Buddy', {
      body: data.body ?? 'Aaj raat ki kahani tayaar karo 🌙',
      icon: '/images/pari-loading.png',
      badge: '/images/pari-loading.png',
      data: { url: data.url ?? '/bolo-buddy/stories' }
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data.url))
})
