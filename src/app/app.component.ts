import { Component } from '@angular/core';
import {DataService} from './services/data.service';
import {ServerService} from './services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'films';
  constructor (public dataService: DataService) {}
}

