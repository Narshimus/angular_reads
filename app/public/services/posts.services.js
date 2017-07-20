(function() {
  'use strict';

  angular.module('app')
    .service('postsService', postsService);

  postsService.$inject = ['$http'];

  function postsService($http) {

    this.getPosts = function getPosts() {
      return $http.get('/api/posts')
        .then(function(results) {
          return results.data;
        });
    };

    this.getPostById = function getPostById(id){
        return $http.get(`/api/posts/${id}`)
          .then(function(results){
            return results.data;
          });
    };

    this.createPost = function createPost(post) {
      return $http.post('/api/posts', post)
        .then(response => {
          response.data.comments = [];
          return response.data;
        });
    };

    this.copy = function copy(post) {
      return angular.copy(post);
    };

    this.editPost = function editPost(post) {
      return $http.patch(`/api/posts/${post.id}`, post);
    };

    this.deletePost = function deletePost(id) {
      return $http.delete(`/api/posts/${id}`);
    };

    this.voteUp = function voteUp(id) {
      return $http.post(`/api/posts/${id}/votes`)
        .then(function(response) {
          return response.data.vote_count;
        });
    };

    this.voteDown = function voteDown(id) {
      return $http.delete(`/api/posts/${id}/votes`)
        .then(function(response) {
          return response.data.vote_count;
        });
    };

  }
}());
