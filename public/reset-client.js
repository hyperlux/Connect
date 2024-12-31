// Script to reset client-side state and clear service workers
async function resetClientState() {
  console.log('Starting client reset...');

  // Clear all service worker registrations
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
      console.log('Service worker unregistered');
    }
  } catch (error) {
    console.error('Error unregistering service workers:', error);
  }

  // Clear all caches
  try {
    const keys = await caches.keys();
    for (const key of keys) {
      await caches.delete(key);
      console.log('Cache cleared:', key);
    }
  } catch (error) {
    console.error('Error clearing caches:', error);
  }

  // Clear localStorage
  try {
    localStorage.clear();
    console.log('localStorage cleared');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }

  console.log('Client reset complete. Please refresh the page.');
}

// Execute reset
resetClientState();