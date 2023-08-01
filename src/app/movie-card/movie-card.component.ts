import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    this.movies = resp;
    console.log(this.movies);
    return this.movies;
  });
}


openGenre(Name: string, Description: string): void {
   this.dialog.open(MovieInfoComponent, {
     data: {
       title: Name,
       content: Description,
     },
   });
}

openDirector(Name: string, Bio: string): void {
  this.dialog.open(MovieInfoComponent, {
    data: {
      title: Name,
      content: Bio,
    },
  });
}

openSynopsis(Description: string): void {
  this.dialog.open(MovieInfoComponent, {
    data: {
      title: 'Synopsis',
      content: Description
    }
  })
}

addFavorite(id: string): void {
  this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
    this.snackBar.open('Movie added to favorites', 'OK', {
      duration: 2000
    });
    this.ngOnInit();
  });
}

isFavorite(id: string): boolean {
  return this.fetchApiData.isFavoriteMovie(id);
}

removeFavorite(id: string): void {
  this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
    this.snackBar.open('Movie removed from favorites', 'OK', {
      duration: 2000
    });
  });
}
}
