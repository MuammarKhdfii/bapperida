// ══════════════════════════════════════════════════════
//  REALTIME-SYNC.JS — Real-time Multi-User Collaboration
//  Firebase Realtime Listener untuk sync antar juri
// ══════════════════════════════════════════════════════

const realtimeSync = {
  listeners: {},
  
  /**
   * Subscribe to real-time updates for all innovations
   * Auto-update UI when any jury saves their assessment
   */
  async subscribeToAllUpdates() {
    if (!firebaseInitialized || !database) {
      console.log('⚠️ Firebase not available for real-time sync');
      return;
    }
    
    console.log('👂 Subscribing to real-time updates...');
    
    // Listen to entire penilaian node
    const ref = database.ref('penilaian');
    
    ref.on('child_changed', (snapshot) => {
      const sanitizedKey = snapshot.key;
      const originalKey = desanitizeFirebaseKey(sanitizedKey);
      const data = snapshot.val();
      
      console.log('🔄 Real-time update detected:', originalKey);
      
      // Update localStorage
      this.updateLocalStorage(originalKey, data);
      
      // Show notification
      this.showUpdateNotification(originalKey, data);
      
      // Refresh UI if on relevant page
      this.refreshUI();
    });
    
    ref.on('child_added', (snapshot) => {
      const sanitizedKey = snapshot.key;
      const originalKey = desanitizeFirebaseKey(sanitizedKey);
      const data = snapshot.val();
      
      console.log('✨ New assessment detected:', originalKey);
      
      // Update localStorage
      this.updateLocalStorage(originalKey, data);
      
      // Refresh UI
      this.refreshUI();
    });
    
    console.log('✅ Real-time sync activated');
  },
  
  /**
   * Update localStorage with new data from Firebase
   */
  updateLocalStorage(namaInovasi, data) {
    try {
      const all = JSON.parse(localStorage.getItem('draf_iid2026_all') || '{}');
      all[namaInovasi] = data;
      localStorage.setItem('draf_iid2026_all', JSON.stringify(all));
      console.log('💾 localStorage updated:', namaInovasi);
    } catch(e) {
      console.error('Error updating localStorage:', e);
    }
  },
  
  /**
   * Show notification when another jury saves assessment
   */
  showUpdateNotification(namaInovasi, data) {
    const currentUser = getSession()?.nama;
    const lastUpdatedBy = data.activeJuri;
    
    // Don't show notification for own updates
    if (lastUpdatedBy === currentUser) return;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'realtime-notification';
    notification.innerHTML = `
      <div class="rtn-icon">🔴</div>
      <div class="rtn-content">
        <div class="rtn-title">Update Real-time</div>
        <div class="rtn-text">
          <strong>${lastUpdatedBy}</strong> baru saja menilai 
          <strong>${namaInovasi}</strong>
        </div>
      </div>
      <button class="rtn-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Play notification sound (optional)
    this.playNotificationSound();
  },
  
  /**
   * Refresh UI components
   */
  refreshUI() {
    // Refresh ranking if on index page
    if (typeof renderLandingRanking === 'function') {
      console.log('🔄 Refreshing ranking...');
      renderLandingRanking().catch(err => console.error('Ranking refresh error:', err));
    }
    
    // PERBAIKAN: JANGAN auto-refresh dropdown untuk menghindari hilangnya inovasi yang sudah dinilai
    // Dropdown hanya refresh saat halaman pertama kali dimuat
    // if (typeof populateInovasiDropdown === 'function') {
    //   console.log('🔄 Refreshing dropdown...');
    //   populateInovasiDropdown().catch(err => console.error('Dropdown refresh error:', err));
    // }
    
    // Update status cards if available (hanya update status bar, tidak refresh dropdown)
    if (typeof updateStatusCards === 'function') {
      const sel = document.getElementById('globalInovasi');
      if (sel && sel.value) {
        updateStatusCards(sel.value).catch(err => console.error('Status card refresh error:', err));
      }
    }
    
    // Update assessment progress counter
    if (typeof updateAssessmentProgress === 'function') {
      console.log('🔄 Refreshing assessment progress...');
      updateAssessmentProgress().catch(err => console.error('Progress refresh error:', err));
    }
  },
  
  /**
   * Play subtle notification sound
   */
  playNotificationSound() {
    try {
      // Create subtle beep sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch(e) {
      // Sound not critical, ignore errors
    }
  },
  
  /**
   * Subscribe to specific innovation updates
   */
  subscribeToInnovation(namaInovasi, callback) {
    if (!firebaseInitialized || !database) return;
    
    const sanitizedKey = sanitizeFirebaseKey(namaInovasi);
    const ref = database.ref(`penilaian/${sanitizedKey}`);
    
    ref.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data && callback) {
        callback(data);
      }
    });
    
    // Store listener for cleanup
    this.listeners[namaInovasi] = ref;
    
    console.log('👂 Subscribed to:', namaInovasi);
  },
  
  /**
   * Unsubscribe from innovation updates
   */
  unsubscribeFromInnovation(namaInovasi) {
    if (this.listeners[namaInovasi]) {
      this.listeners[namaInovasi].off();
      delete this.listeners[namaInovasi];
      console.log('🔇 Unsubscribed from:', namaInovasi);
    }
  },
  
  /**
   * Unsubscribe from all
   */
  unsubscribeAll() {
    Object.keys(this.listeners).forEach(key => {
      this.unsubscribeFromInnovation(key);
    });
  },
  
  /**
   * Show live jury activity indicator
   */
  showLiveIndicator(juryName, action) {
    const indicator = document.getElementById('liveIndicator');
    if (!indicator) return;
    
    indicator.innerHTML = `
      <span class="live-dot"></span>
      <span class="live-text">
        <strong>${juryName}</strong> ${action}
      </span>
    `;
    indicator.style.display = 'flex';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      indicator.style.opacity = '0';
      setTimeout(() => {
        indicator.style.display = 'none';
        indicator.style.opacity = '1';
      }, 300);
    }, 3000);
  }
};

// Auto-start real-time sync when Firebase ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (firebaseInitialized && ENABLE_FIREBASE) {
        realtimeSync.subscribeToAllUpdates();
      }
    }, 2000); // Wait 2s for Firebase to fully initialize
  });
} else {
  setTimeout(() => {
    if (typeof firebaseInitialized !== 'undefined' && firebaseInitialized && ENABLE_FIREBASE) {
      realtimeSync.subscribeToAllUpdates();
    }
  }, 2000);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  realtimeSync.unsubscribeAll();
});

// Expose globally
window.realtimeSync = realtimeSync;

console.log('✅ realtime-sync.js loaded');
