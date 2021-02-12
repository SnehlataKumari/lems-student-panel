import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  greetingMsg;
  constructor(
    public authservice: AuthService,
  ) { }

  ngOnInit(): void {

    const currentHour = new Date().getHours();

    this.greetingMsg =
      currentHour >= 4 && currentHour < 12 ? // after 4:00AM and before 12:00PM
        'Good morning.' :
        currentHour >= 12 && currentHour <= 17 ? // after 12:00PM and before 6:00pm
          'Good afternoon.' :
          currentHour > 17 || currentHour < 4 ? // after 5:59pm or before 4:00AM (to accommodate night owls)
            'Good evening.' : // if for some reason the calculation didn't work
            'Welcome'

  }

}
