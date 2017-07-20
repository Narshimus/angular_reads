(function() {
  'use strict';

  angular.module('app')
    .component('posts', {
      controller: controller,
      templateUrl: "/posts/posts.html"
    });

  controller.$inject = ['postsService'];

  function controller(postsService) {
    const vm = this;

    vm.$onInit = function onInit() {
      postsService.getPosts()
        .then(function(data) {
          vm.posts = data;
        });
    };

    vm.createPost = function createPost() {
      postsService.createPost(vm.post).then(function(data) {
        vm.posts.push(data);
        delete vm.post;
      });
    };

  }
}());
