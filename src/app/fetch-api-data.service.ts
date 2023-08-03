import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


//declaring the api url that will provide data for the client app
const apiUrl = 'https://jens-movie-api.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  //inject the HttpClient module to the constructor params
  //this provides HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient){
  }
  //making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //making the api call for the login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post("https://jens-movie-api.herokuapp.com/login?Name=jensfavoritemovies&Password=ohMyGod77", userDetails).pipe(
      catchError(this.handleError)
    );
  }

//api call for all movies endpoint
getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
    {
      Authorization: 'Bearer' + token,
    })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
}

//api call for get ONE movie endpoint 
getOneMovie(title: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/' + title, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
}

//api call for one director endpoint
getOneDirector(directorName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/director/' + directorName, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
}

//api call for one genre endpoint
getOneGenre(genreName: string): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'movies/genre/' + genreName, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
}

//api call to get a user
getUser(): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user;
}

//api call for favorite movies endpoint
getFavoriteMovies(): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + 'users/' + user.Name, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
        map(this.extractResponseData),
        map((data) => data.Movies),
        catchError(this.handleError)
      );
}

//api call for adding a favorite movie
addFavoriteMovie(movieId: string): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  user.Movies.push(movieId);
  localStorage.setItem('user', JSON.stringify(user));
  return this.http.post(apiUrl + 'users/' + user.Name + '/movies/' + movieId, {}, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      }),
      responseType: "text"
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

isFavoriteMovie(movieId: string): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.Movies.indexOf(movieId) >= 0;
}

//api call for edit user endpoint
editUser(updatedUser: any): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + user.Name, updatedUser, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
}

//api call for delete user endpoint
deleteUser(): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + user._id, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })}).pipe(
        catchError(this.handleError)
      );
}

//api call for removing a movie from fav movies
deleteFavoriteMovie(movieId: string): Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const index = user.Movies.indexOf(movieId);
  console.log(index);
  if (index > -1) {
    user.Movies.splice(index, 1);
  }
  localStorage.setItem('user', JSON.stringify(user));
  return this.http.delete(apiUrl + 'users/' + user.Name + '/movies/' + movieId, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      }),
      responseType: "text"
  }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
    console.error('Some error occured:', error.error.message);
  } else if (error.error.errors) {
    return throwError(() => new Error(error.error.errors[0].msg));
  }
  else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`
    );
  }
  return throwError(() => new Error('Something bad happened; please try again later.'));
}
//non-typed response extraction
private extractResponseData(res: any): any{
  const body = res;
  return body || { };
}
}

