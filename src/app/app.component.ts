import { Component } from '@angular/core';
import '../../public/css/styles.css';

@Component({
  selector: 'my-app',
  template: require('./app.component.html')
})
export class AppComponent { }

@Component({
  template: require('./secureapp.component.html')
})
export class SecureAppComponent { }
