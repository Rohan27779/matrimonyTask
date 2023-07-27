import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JsonService } from 'src/app/services/json.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router,private jsonService: JsonService){

  }

  ngOnInit() {
    this.getProfileData();
  }

  getProfileData() {
    this.jsonService.storeProfileData();
  }

  navigateToPage(page: string) {
    this.router.navigate([page]);
  }
}
