import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EntityRep, RestService } from '@incrudable/rest';

interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  hours_worked: number;
  hourly_wage: number;
}

@Component({
  selector: 'incrudable-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.scss']
})
export class RestComponent {
  employees: EntityRep<Employee>;
  colors: EntityRep<string>;

  constructor(restService: RestService, private httpClient: HttpClient) {
    this.employees = restService.createEntity(
      'employees',
      'http://localhost:8085/employees'
    );

    this.colors = restService.createEntity(
      'colors',
      'http://localhost:8085/colors',
      [this.employees]
    );
  }

  addOne() {
    this.employees.addOne({
      first_name: 'Paul',
      last_name: 'Spears',
      email: 'dpsthree'
    });
  }

  addItSimple() {
    this.httpClient
      .post('http://localhost:8085/employees', {
        first_name: 'Paul',
        last_name: 'Spears',
        email: 'dpsthree'
      })
      .subscribe();
  }
}
