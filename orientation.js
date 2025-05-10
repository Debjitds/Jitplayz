class MainActivity {
  constructor() {
      this.onCreate();
  }

  onCreate() {
      this.setContentView('activity_main'); 
      this.setRequestedOrientation('portrait'); 
  }

  setContentView(potrait) {
      // Simulate setting the content view
      console.log('Content view set to:', potrait);
  }

  setRequestedOrientation(potrait) {
      // Simulate setting the screen orientation
      console.log('Screen orientation set to:', potrait);
  }
}

const mainActivity = new MainActivity();