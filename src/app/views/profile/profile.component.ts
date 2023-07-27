import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonService } from 'src/app/services/json.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileData: any;

  constructor(
    private route: ActivatedRoute,
    private jsonService: JsonService,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['profileId']) {
        const profilesData = this.jsonService.getProfileData();
        this.profileData = profilesData.filter((profile:any) => profile.id === params['profileId'])[0];
      }
    });
  }

  goBack() {
    this.router.navigate(['/my-matches']);
  }
}
