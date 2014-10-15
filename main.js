// var myScope;

var TTTApp = angular.module('TTTApp', []);
TTTApp.controller('TTTController', function ($scope) {
  // var promise = $http.get("https://api.github.com/repos/lorint/AndrewIG/issues");
  // promise.success(function(data){
  //   $scope.issues = data;
  // });
  // promise.error(function(err){
  //   console.log(err);
  // });

  $scope.cellList = [
  {status: "A"}, 
  {status: "B"}, 
  {status: "C"}, 
  {status: "D"}, 
  {status: "E"}, 
  {status: "F"}, 
  {status: "G"}, 
  {status: "H"}, 
  {status: "I"}
  ];
  
  $scope.movecounter = 0;
  // $scope.alreadyClicked = false;

  $scope.playerPicks = function(thisCell) {
    if(thisCell.status != 'X' && thisCell.status != 'O') {  
        if (($scope.movecounter % 2) == 0) {
          thisCell.status = "X";  
        } 
        else {
          thisCell.status = "O";
        }
        $scope.checkWinner();

        $scope.movecounter++; 
    }
    else {
      thisCell.alreadyClicked = true;
    }
    // console.log("Cell is now: " + thisCell.status);
  } ;

  $scope.checkWinner = function() {
    if (

      ($scope.cellList[0].status === $scope.cellList[1].status && $scope.cellList[0].status === $scope.cellList[2].status) ||
      ($scope.cellList[0].status === $scope.cellList[3].status && $scope.cellList[0].status === $scope.cellList[6].status) ||
      ($scope.cellList[0].status === $scope.cellList[4].status && $scope.cellList[0].status === $scope.cellList[8].status) ||

      ($scope.cellList[1].status === $scope.cellList[4].status && $scope.cellList[1].status === $scope.cellList[7].status) ||

      ($scope.cellList[2].status === $scope.cellList[4].status && $scope.cellList[2].status === $scope.cellList[6].status) ||
      ($scope.cellList[2].status === $scope.cellList[5].status && $scope.cellList[2].status === $scope.cellList[8].status) ||
      ($scope.cellList[3].status === $scope.cellList[4].status && $scope.cellList[3].status === $scope.cellList[5].status) ||

      ($scope.cellList[6].status === $scope.cellList[7].status && $scope.cellList[6].status === $scope.cellList[8].status)

      )

      {
        if (($scope.movecounter % 2) == 0) {
          // alert("Player X, You Won!");
          $scope.testString = "Player X has Won!";
          // cellList.alreadyClicked = true;
        }
        else {
          // alert("Player O, You Won!");
          $scope.testString = "Player O has Won!";
          // cellList.alreadyClicked = true;
        }
      }
      else if ($scope.movecounter==8){
          // alert("tie game...");
          $scope.testString = "Tie Game!";
          // cellList.alreadyClicked = true;
      }
    };



$scope.reset = function() {
    $scope.movecounter = 0;
    $scope.cellList=[
      {status: "A"}, 
      {status: "B"}, 
      {status: "C"}, 
      {status: "D"}, 
      {status: "E"}, 
      {status: "F"}, 
      {status: "G"}, 
      {status: "H"}, 
      {status: "I"}
      ];
    $scope.testString = "";
  };
});

// Custom Directive Stuff
// TTTApp.directive('myDirective', function () {
//   return {
//     template: '<ul class="rating">' +
//                   '<li x-ng-repeat="star in stars" class="filled">' +
//                       '\u2605' +
//                   '</li>' +
//                 '</ul>',
//     restrict: 'A',
//     scope: {
//     ratingValue: "="
//     },
//     link: function (scope, elem, attrs) {
//       console.log("Directive", scope, elem, attrs);

//       scope.$watch("ratingValue", function(newThing, oldThing){
//         scope.stars = [];
//         for(var x = 0; x < parseInt(newThing); x++)
//         {
//           scope.stars.push({});
//         }
//       });
//     }
//   }
// });