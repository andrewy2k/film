import { Injectable } from '@angular/core';
import {IFilm} from '../models/models';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  list: IFilm[] = [];
  selectedFilm: IFilm[] = [];
  moreInfoViewStatus = false;
  selectedImdbID = '';

  filmSelect(elem: IFilm, filmStatus): void {
    let removeInd: number;
    if (!filmStatus) {
      this.selectedFilm.push(elem);
    } else {
      for (let i = 0; i < this.selectedFilm.length; i++) {
        if ( this.selectedFilm[i].imdbID === elem.imdbID) {
          removeInd = i;
          break;
        }
      }
      this.selectedFilm.splice(removeInd, 1);
    }
  }

  filmStatus(elem: IFilm): boolean {
    for (let i = 0; i < this.selectedFilm.length; i++) {
      if ( this.selectedFilm[i].imdbID === elem.imdbID) {
        return true;
      }
    }
    return false;
  }

  constructor() { }
}
