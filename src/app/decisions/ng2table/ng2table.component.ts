import { Component, OnInit, OnDestroy } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-ng2table',
  templateUrl: './ng2table.component.html',
  styleUrls: ['./ng2table.component.css']
})
export class Ng2tableComponent implements OnInit, OnDestroy {

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {}

  ngOnDestroy() {}
}
