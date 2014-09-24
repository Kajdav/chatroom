var app = angular.module('twitterClone');

app.controller('mainCtrl', function($scope, parseService){
  $scope.getParseData = function() {
    parseService.getData()
      .then(function(data){
        for (var i = 0; i < data.data.results.length; i++) {
          data.data.results[i].createdAt = new Date(data.data.results[i].createdAt)
        }
        $scope.messages = data.data.results;
      })
  }

  $scope.showNewMessage=true;
  $scope.showFilterMessage=false;

  $scope.showFilter = function() {
    $scope.showNewMessage=false;
    $scope.showFilterMessage=true;
  }
  $scope.showNew = function() {
    $scope.showNewMessage=true;
    $scope.showFilterMessage=false;
  }

  $scope.postData = function() {
    var postMessage = {};
    postMessage.text = $scope.message;
    parseService.postData(postMessage);
    $scope.message = '';
  }
  $scope.getParseData();
  setInterval(function(){
    $scope.getParseData();
  }, 1000)
})
  //In your controller you'll have a getParseData function and a postData function, but should be placed on $scope.

  //The getParseData function will call the getData method on the parseService object. You'll then save the result of that request to 
  //your controllers $scope as messages ($scope.messages)
  // getParseData = function() {
  //   debugger;
  //   return parseService.getData();
  // }
  //The postData function will take whatever the user typed in (hint: look at the html and see what ng-model correlates to on the input box),
  //pass that text to the postData method on the parseService object which will then post it to the parse backend.
  //uncomment this code when your getParseData function is finished
  //This goes and gets new data every second, which mimicking a chat room experience.