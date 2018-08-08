import { Injectable } from '@angular/core';

import { interval } from 'rxjs';
import { sample } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  constructor() { }
  public getData() {
    const source = interval(1000);
    return source.pipe(sample(interval(2000)));
  }
}
