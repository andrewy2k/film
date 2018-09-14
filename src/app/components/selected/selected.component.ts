import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {ServerService} from '../../services/server.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.less']
})
export class SelectedComponent implements OnInit {

    getPosterUrl(url: string): string {
        if (url.toLowerCase() === 'n/a') {
            return './assets/img/video.png';
        }
        return url;
    }

  constructor(private server: ServerService, public dataService: DataService) { }

  ngOnInit() {
  }

}
