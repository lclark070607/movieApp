const app = angular.module('MovieApp', []);

// constructor for creating new movies
function movie(title, release_date) {
    this.title = title;
    this.release_date = release_date;
    // this.movieGenre = movieGenre;
    this.rated = rated;
    this.poster_path = null;
    this.overview = null;
    this.id = null;
    this.added = null;
    this.isRated = false;
    this.rating = null;

    return this;
}

app.controller('NewMovieController', function ($scope, MovieService) {

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
    $scope.movies = MovieService.getMovies();

    $scope.ratedMovie = function (current) {
        MovieService.markAsRated(current);
    };

});


app.controller('StarRatingController', function ($scope, MovieService) {
    $scope.rating = 5;

    $scope.rateFunction = function (rating) {
        alert('You selected - ' + rating + ' stars');
    };
})


    .directive('starRating',
    function () {
        return {
            //String of subset of EACM which restricts the directive to a specific directive declaration style. If omitted, the defaults (elements and attributes) are used.
            restrict: 'A',
            template: '<ul class="rating">'
            + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
            + '  <i class="fa fa-star-o"></i>'
            //  + '\u2605'
            + '</li>'
            + '</ul>',
            scope: {
                ratingValue: '=',
                max: '=',
                onRatingSelected: '&'
            },
            link: function (scope, elem, attrs) {
                var updateStars = function () {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };

                scope.toggle = function (index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating: index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function (oldVal, newVal) {
                        if (newVal) {
                            updateStars();
                        }
                    }
                );
            }
        };
    }
    );


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

        markAsRated(stars) {
            stars.isRated = true;
        },

    };
});





