(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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






},{}]},{},[1]);
