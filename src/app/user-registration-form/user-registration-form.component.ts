import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Name: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void{
}

/**
 * this this the function responsible for sending the form inputs to the backend
 */
registerUser(): void {
  this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
    this.dialogRef.close(); //closes the modal on success
    console.log(result);
    this.snackBar.open("Successfully registered", 'OK', {
      duration: 2000
    });
  }, (result) => {
    console.log(result);
    this.snackBar.open(result, 'OK', {
      duration: 2000
    });
  });
}
}
