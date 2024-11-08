import { Injectable, Signal, signal } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTermSubject = new BehaviorSubject<string>('');

  setSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }
}
