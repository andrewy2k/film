import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ServerService } from '../../services/server.service';
import { IFilm } from '../../models/models';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})

export class SearchComponent implements OnInit {
    search = new FormControl();
    list: IFilm[] = [];
    whaitStatus = false;
    selectOneFilmStatus = false;
    myObservable: any;

    // Выбор поля для показа
    titleView(elem?: IFilm): string | undefined {
        return elem ? elem.Title : undefined;
    }

    // Рекурсивная загрузка списка фильмов
    loadData(search: string, page?: number): void {
        this.whaitStatus = true;
        if (page !== undefined) {
            this.myObservable = this.server.getDataByTitle(search, page).subscribe(
                data => {
                    this.dataService.list = this.dataService.list.concat(data.Search);
                    if (Number(data.totalResults) > page * 10 ) {
                       this.loadData(search, (page + 1));
                    } else {
                        this.whaitStatus = false;
                    }
                },
                error => {
                    console.log( error );
                }
            );
        } else {
            this.dataService.list = [];
            this.myObservable = this.server.getDataByTitle(search).subscribe(
                data => {
                    this.dataService.list = data.Search;
                    if (Number(data.totalResults) > 10 ) {
                        this.loadData(search, 2);
                    } else {
                        this.whaitStatus = false;
                    }
                },
                error => {
                    console.log( error );
                    this.myObservable.unsubscribe();
                }
            );
        }
    }

    selectedFilm(elem: IFilm): void {
        this.dataService.list = [elem];
        this.selectOneFilmStatus = true;
    }

  constructor(private server: ServerService, public dataService: DataService) {
      this.search.valueChanges
          .pipe(debounceTime(500),
              distinctUntilChanged()
              )
          .subscribe(search => {
              if (search.length > 2 && !this.selectOneFilmStatus) {
                  if (this.myObservable !== undefined ) {
                      this.myObservable.unsubscribe();
                  }
                  this.loadData(search);

              } else if ( search.length === 0) {
                  this.dataService.list = [];
              } else {
                  this.selectOneFilmStatus = false;
              }
          });
  }

  ngOnInit() {
  }

}
