import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import User from 'src/app/entities/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  /* Subscription. */
  private subscription = new Subscription();
  /* User instance. */
  user: User;
  /* User's roles. */
  roles = [];

  /**
   * @constructor
   * 
   * @param userService - makes requests to the backend
   */
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    /* Creates a new user instance which will carry the information from the GET request. */
    this.user = new User();
    /* GET request to the backend. */
    this.subscription.add(this.userService.getUserProfile().subscribe(data => {
      this.user = data;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
