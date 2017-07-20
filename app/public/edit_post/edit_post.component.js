(function() {
  'use strict';

  angular.module('app')
    .component('editPosts', {
      controller: controller,
      templateUrl: "/edit_post/edit_post.html"
    });

  controller.$inject = ['postsService','$stateParams','$state'];

  function controller(postsService,$stateParams,$state) {
    const vm = this;

    vm.$onInit = function onInit(){
      postsService.getPostById($stateParams.id)
        .then(function(data){
          vm.edit = data;
        });
    };

    vm.editPost = function editPost(){
      postsService.editPost(vm.edit)
        .then(function(){
          $state.go('posts');

        });
    };
  }

})();
