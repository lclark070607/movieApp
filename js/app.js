const app = angular.module('MovieApp', []);

// constructor for creating new movies
function movie(title, release_date) {
    this.title = title;
    this.release_date = release_date;
    // this.movieGenre = movieGenre;
    this.poster_path = null;
    this.id = null;
    this.added = null;

    return this;
}

app.controller('newMovieController', function ($scope, MovieService) {
    
    $scope.title = '';
    $scope.release_date = '';
    // $scope.movieGenre = '';


    $scope.newMovie = function () {

        const brandNewMovie = new Movie($scope.title, $scope.release_date);

        //clears my textboxes after submit
        $scope.title = '';
        $scope.release_date = '';

    };

});

app.controller('ListMovieController', function ($scope, MovieService) {
    $scope.movies = MovieService.getMovies

});


// app.controller('StarRatingController', function ($scope, MovieService) {


// }


app.factory('MovieService', function ($http) {
    let movies = [];

    $http.get('https://api.themoviedb.org/4/list/14842?page=1&api_key=b2ff2aa190e51a05f0b622f779200cd5').then(function (response) {
        angular.copy(response.data.results, movies);
    });

    return {

        add(movie) {
            movies.push(movie);

            $http.post('https://api.themoviedb.org/4/list/14842?page=1&api_key=b2ff2aa190e51a05f0b622f779200cd5', {
                title: movie.title,
                release_date: movie.release_date,
            });
        },

        getMovies: function () {
            return movies;
        },

    };
});





