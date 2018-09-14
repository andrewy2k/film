import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.less']
})
export class ResultComponent implements OnInit {

  getPosterUrl(url: string): string {
    if (url.toLowerCase() === 'n/a') {
      return './assets/img/video.png';
    }
    return url;
  }

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

}
