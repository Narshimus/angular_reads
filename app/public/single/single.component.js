(function() {
  'use strict';

  angular.module('app')
    .component('single', {
      controller: controller,
      templateUrl: "/single/single.html",
      bindings: {
        post: '<'
      }
    });
  controller.$inject = ['postsService', '$window','$state'];

  function controller(postsService, $window, $state) {
    const vm = this;

    vm.copy = function copy() {
      vm.edit = postsService.copy(vm.post);
    };

    vm.editPost = function editPost() {
      postsService.editPost(vm.edit).then(function() {
        vm.post = vm.edit;
        vm.cancelEdit();
      });
    };

    vm.cancelEdit = function cancelEdit() {
      delete vm.edit;
    };

    vm.deletePost = function deletePost() {
      if ($window.confirm('Are you sure you want to delete this post?')) {
        postsService.deletePost(vm.post.id).then(function() {
          delete vm.post;
        });
      }
    };

    vm.voteUp = function voteUp() {
      postsService.voteUp(vm.post.id)
        .then(function(votes) {
          vm.post.vote_count = votes;
        });
    };

    vm.voteDown = function voteDown() {
      postsService.voteDown(vm.post.id)
        .then(function(votes) {
          vm.post.vote_count = votes;
        });
    };

    vm.editPage = function editPage(e){
      console.log('yo');
      e.preventDefault();
      postsService.copy(vm.post);
      $state.go(`/posts/${vm.post.id}/edit`);
    };

  }
}());
