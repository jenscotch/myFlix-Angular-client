import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {

  constructor(
    private router: Router
  ) { }

ngOnInit(): void {
}
/**
 * function that allows user to navigate to all movies
 */
toMovies(): void {
  this.router.navigate(['movies']);
}
/**
 * allows user to navigate to profile
 */
toProfile(): void {
  this.router.navigate(['profile']);
}
/**
 * allows user to log out 
 */
logOut(): void {
  this.router.navigate(['welcome']);
  localStorage.clear();
}


}
