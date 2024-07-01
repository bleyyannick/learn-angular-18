import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingService} from '../housing.service';
import { HousingLocation } from '../housing-location';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLoc of filteredLocationList"
        [housingLocation]="housingLoc"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  housingService: HousingService = inject(HousingService);
  housingLocationList!: HousingLocation[];
  filteredLocationList: HousingLocation[] = [] ;

  readonly baseUrl = 'https://angular.dev/assets/tutorials/common';

  constructor() {
    this.housingService.getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
            this.housingLocationList = housingLocationList;
            this.filteredLocationList = housingLocationList;
          });
  }

  filterResults(city: string) {
    this.filteredLocationList = this.housingLocationList.filter(location => 
      location.city.toLowerCase().includes(city.toLowerCase())
    );
  }
  

}