(function(){

'use strict';

  angular.module('app', ['ui.router'])
    .config(appConfig);

  appConfig.$inject = ['$stateProvider', '$locationProvider'];

  function appConfig($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
      .state({
        name: 'posts',
        url: '/',
        component: 'posts'
      })
      .state({
        name: 'editPosts',
        url: '/posts/:id/edit',
        component: 'editPosts'
      });
  }

})();
