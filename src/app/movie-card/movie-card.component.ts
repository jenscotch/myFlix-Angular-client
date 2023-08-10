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
/**
 * fetches all movies from api
 */
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    this.movies = resp;
    console.log(this.movies);
    return this.movies;
  });
}

/**
 * opens genre info dialog
 * @param Name - name of the genre (comedy, drama, etc.)
 * @param Description - description of the genre
 */
openGenre(Name: string, Description: string): void {
   this.dialog.open(MovieInfoComponent, {
     data: {
       title: Name,
       content: Description,
     },
   });
}
/**
 * opens director info dialog
 * @param Name - director's name 
 * @param Bio - a short summary about the director
 */
openDirector(Name: string, Bio: string): void {
  this.dialog.open(MovieInfoComponent, {
    data: {
      title: Name,
      content: Bio,
    },
  });
}
/**
 * opens the actor dialog
 * @param Actors - names of primary actors in movie
 */
openActors(Actors: string): void {
  this.dialog.open(MovieInfoComponent, {
    data: {
      title: 'Cast',
      content: Actors
    }
  })
}
/**
 * opens movie description dialog
 * @param Description - short summary of the movie
 */
openSynopsis(Description: string): void {
  this.dialog.open(MovieInfoComponent, {
    data: {
      title: 'Synopsis',
      content: Description
    }
  })
}
/**
 * adds the movie (by id) to an array of the user's favorite movies
 * @param id - movie id
 */
addFavorite(id: string): void {
  this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
    this.snackBar.open('Movie added to favorites', 'OK', {
      duration: 2000
    });
    this.ngOnInit();
  });
}
/**
 * checks to see if the movie id is in the user's favorite movies array
 * @param id - movie id
 * @returns true or false
 */
isFavorite(id: string): boolean {
  return this.fetchApiData.isFavoriteMovie(id);
}
/**
 * removes movie (by id) from the user's array of favorite movies
 * @param id - movie id
 */
removeFavorite(id: string): void {
  this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
    this.snackBar.open('Movie removed from favorites', 'OK', {
      duration: 2000
    });
  });
}
}
