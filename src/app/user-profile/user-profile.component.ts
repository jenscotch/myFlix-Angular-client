import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  favoriteMovies: any[] = [];

  @Input() userData = { Name: '', Password: '', Email: '', Birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

ngOnInit(): void {
  this.getUser();
}

getUser(): void {
  this.user = this.fetchApiData.getUser();
  this.userData.Name = this.user.Name;
  this.userData.Email = this.user.Email;
  this.userData.Birthday = formatDate(this.user.Birthday, 'mm-dd-yyyy', 'en-US', 'UTC+0');

  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    this.favoriteMovies = resp.filter((m: {_id: any; }) => this.user.Movies.indexOf(m._id) >= 0);
  });
}

editUser(): void {
  this.fetchApiData.editUser(this.userData).subscribe((result) => {
    localStorage.setItem('user', JSON.stringify(result));

    this.snackBar.open('User updated successfully', 'OK', {
      duration: 2000
    });
  }, (result) => {
    this.snackBar.open(result, 'OK', {
      duration: 2000
    });
  });
}

deleteUser(): void {
  this.fetchApiData.deleteUser().subscribe((result) => {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('User deleted successfully', 'OK', {
      duration: 2000
    });
  }, (result) => {
    this.snackBar.open(result, 'OK', {
      duration: 2000
    });
  });
}

}
