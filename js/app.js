const app = angular.module('MovieApp', []);

app.controller('MovieListController', function ($scope, MovieService) {
    $scope.movies = MovieService.getMovies();
    

    $scope.newMovie = function (jamMovie) {
        let jamMovie = [$scope.movieName, $scope.movieDate, $scope.movieGenre];
        MovieService.addMovie($scope.movieName, $scope.movieDate, $scope.movieGenre);
       //clears my textboxes after submit
        $scope.movieName = '';
        $scope.movieDate = '';
        $scope.movieGenre = '';
    };

});

app.factory('MovieService', function () {
    let movies = [];

    return {

        addMovie: function (input) {
            movies.push(input);
        },
        
        getMovies: function () {
            return movies;
        },
    };
});





