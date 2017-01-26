const app = angular.module('MovieApp', []);

app.controller('MovieListController', function ($scope, MovieService) {
    $scope.movies = MovieService.getMovies();


    $scope.newMovie = function () {
        let jams = {
            movieName: $scope.movieName,
            movieDate: $scope.movieDate,
            movieGenre: $scope.movieGenre,
            movieLike: $scope.movieLike,
            movieHate: $scope.movieHate,
        };

        MovieService.addMovie(jams);

        //clears my textboxes after submit
        $scope.movieName = '';
        $scope.movieDate = '';
        $scope.movieGenre = '';
    };

    $scope.movieLike = function (target) {
        MovieService.likeMovie(target);
    };

    $scope.movieHate = function(zing) {
        MovieService.hateMovie(zing);
    };
    
});



app.factory('MovieService', function () {
    let movies = [];

    return {

        addMovie: function (input) {
            movies.push(input);
        },

        bombMovie: function() {
            movies.classList.add("dislike");
        },

        getMovies: function () {
            return movies;
        },

        likeMovie: function(moo) {
            moo.isLiked = true;
        },

        hateMovie: function(baa) {
            baa.isHated = true;
        },
    };
});





