import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-my-matches',
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent {
  profiles: any[] = [];

  constructor(private jsonService: JsonService, private router: Router) {}

  toProfile(profileId: number) {
    const params: NavigationExtras = {
      queryParams: { profileId: profileId.toString() }
    };
    this.router.navigate(['/profile'], params);
  }

  ngOnInit() {
    this.fetchProfiles();
  }

  fetchProfiles() {
    this.profiles = this.jsonService.getProfileData();
  }
}
