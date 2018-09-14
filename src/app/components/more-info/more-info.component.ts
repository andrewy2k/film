import { Component, Input, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import {DataService} from '../../services/data.service';

export interface IMoreInfo {
    key: string;
    value: string;
}

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.less']
})

export class MoreInfoComponent implements OnInit {

  @Input() imdbID: string;
  data: IMoreInfo[];
  title: string;
  rating: {
    Source: string;
    Value: string;
  }[];
  poster: string;
  loadDataStatus = false;

  preparationDataForTemplate(data: any): void {
    const result: IMoreInfo[] = [];
    for (const key in data ) {
      switch (key) {
        case 'Title':
           this.title = data[key];
          break;
        case 'Ratings':
            this.rating = data[key];
          break;
        case 'Poster':
            this.poster = data[key];
          break;
        case 'Response':
          break;
        default:
          result.push({key: key, value: data[key]});
          break;
        }
    }
    this.data = result;
  }

  constructor( private server: ServerService, public dataService: DataService) { }

  ngOnInit() {
    this.server.getDataById(this.imdbID).subscribe(
        data => {
          this.preparationDataForTemplate(data);
          console.log(data);
          this.loadDataStatus = true;
        },
        error => {
          console.log(error);
        }
    );
  }

}
