import { Component, Input, OnInit } from '@angular/core';
import { JsonService } from 'src/app/services/json.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import * as kf from './keyframes';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-daily-recommendations',
  templateUrl: './daily-recommendations.component.html',
  styleUrls: ['./daily-recommendations.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft)))
    ])
  ]
})
export class DailyRecommendationsComponent implements OnInit {

  public profiles: any[] = [];
  public animationStates: string[] = [];
  public index = 0;
  @Input()
  parentSubject!: Subject<any>;
  animationState: string | undefined;

  constructor(private service: JsonService, private snackBar: MatSnackBar) {}

  async ngOnInit() {
    this.profiles = await this.service.getProfileData();
    this.parentSubject.subscribe(event => {
      this.startAnimation(event)
    });
    this.animationStates = this.profiles.map(() => '');

  }

  getAnimationState(index: number) {
    return this.animationStates[index];
  }


  startAnimation(state: string | undefined) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState(state: any) {
    this.animationState = '';
    this.index++;
  }


  profileStatus(status: boolean, profile: any) {
    if (status) {
      this.snackBar.open('Interested', 'Close', {
        duration: 2000,
        panelClass: 'success-snack',
      });
      this.animateCard(profile, 'swiperight');
    } else {
      this.snackBar.open('Not Interested', 'Close', {
        duration: 2000,
        panelClass: 'error-snack',
      });
      this.animateCard(profile, 'swipeleft');
    }
  }

  shortListed(profile: any) {
    this.snackBar.open('Shortlisted', 'Close', {
      duration: 2000,
      panelClass: 'success-snack',
    });
    this.animateCard(profile, 'swiperight');
  }

  animateCard(profile: any, direction: string) {
    profile.state = direction;
    this.profiles = this.profiles.filter((p) => p !== profile);
  }

  handleCardAnimationDone(direction: string) {
    this.showNextProfile();
  }

  showNextProfile() {
    this.index++;
    if (this.index >= this.profiles.length) {
      this.index = 0;
    }
    this.animationStates[this.index] = '';
  }

  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }

}
