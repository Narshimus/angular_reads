(function() {
  'use strict';

  angular.module('app')
    .component('comment', {
      controller: controller,
      templateUrl: "/comments/comments.html",
      bindings: {
        post: '<'
      }
    });
  controller.$inject = ['commentsService', '$window'];

  function controller(commentsService, $window) {
    const vm = this;

    vm.createComment = function createComment() {
      commentsService.createComment(vm.post.id, vm.newComment)
        .then(function(data) {
          vm.post.comments.push(data);
          delete vm.newComment;
        });
    };

    vm.hover = function hover(comment) {
      comment.showButtons = !comment.showButtons;
    };

    vm.deleteComment = function deleteComment(comment) {
      commentsService.deleteComment(vm.post.id, comment.id)
        .then(function() {
          vm.post.comments = vm.post.comments.filter(function(commentObj) {
            return commentObj.id !== comment.id;
          });
        });
    };

    vm.copyComment = function copyComment(comment) {
      vm.editComment = commentsService.copy(comment);
    };

    vm.editComment = function editComment() {
      commentsService.editComment(vm.post.id, vm.editComment)
        .then(function() {
          vm.post.comments.forEach(function(commentObj) {
            commentObj.id === vm.editComment.id ? commentObj = vm.editComment : null;
          });
          delete vm.editComment;
        });
    };

  }
}());
