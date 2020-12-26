import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import NewCurrency from 'src/app/entities/NewCurrency';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit, OnDestroy {

  /* Registration form. */
  addNewCurrencyForm: FormGroup;

  /* New currency object to be sent. */
  newCurrency: NewCurrency;

  /* Sends requests. */
  private subscriptions = new Subscription();

  /* Is request successful. */
  isSuccessful: boolean = false;

  /**
   * @constructor
   * 
   * @param adminService
   */
  constructor(private adminService: AdminService,
    private router: Router,
    private fb: FormBuilder) { }
  
  /**
   * Get the controls of the register form.
   * 
   * @returns the controls of the registration forms.
   */
  get f() { return this.addNewCurrencyForm.controls }

  ngOnInit(): void {

    /* Form build and validations. */
    this.addNewCurrencyForm = this.fb.group({
      currencyName: ['', [Validators.required]],
      rate: ['', [Validators.required]]
    })
  }

  /**
   * Sends a post request (with a new currency object.)
   * Creates a new currency.
   */
  addCurrency() {

    this.newCurrency = this.addNewCurrencyForm.value; // assign the form value to the new currency object

    /* Send the post request to the backend. */
    this.subscriptions.add(this.adminService.addNewCurrency(this.newCurrency).subscribe(data => {

      this.isSuccessful = true;
    }))

    this.redirectHomeAfterRegistration(); // redirect to home
  }

  // After a successful adding of currency, redirect the user to the home page
  redirectHomeAfterRegistration(){
    window.location.reload();

    window.location.replace("home");
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
