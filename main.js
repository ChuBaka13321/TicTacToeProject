var TTTApp = angular.module('TTTApp', ["firebase"]);
TTTApp.controller('TTTController', function ($scope, $firebase) {

$scope.remoteGameContainer = 
  $firebase(new Firebase("https://tictacchu.firebaseio.com/databaseGameContainer"));

$scope.cellListX = [
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
  
  $scope.movecounterX = 0;

  $scope.p1scoreX=0;
  $scope.p2scoreX=0;
  $scope.goesFirstCounterX = 0;
  $scope.displayStringX="X will go first this turn.";
  $scope.testStringX="";
  $scope.winnerX = false;


 // This container object is what gets synced:
  $scope.gameContainer = {
    cellList: $scope.cellListX,
    movecounter: $scope.movecounterX,
    p1score: $scope.p1scoreX,
    p2score: $scope.p2scoreX,
    goesFirstCounter: $scope.goesFirstCounterX,
    displayString: $scope.displayStringX,
    testString: $scope.testStringX,
    winner: $scope.winnerX
  };

  // Everywhere else in your program, use $scope.gameContainer.cellListArray instead of cellList.
  // Everywhere else in your program, use $scope.gameContainer.clickCounter instead of clickCount.
  // Make that change in your ng-repeat as well and anywhere in your index.html as needed.


  // remoteGameContainer: that is the name you gave the Firebase node (looks like a folder in Firebase).
  // The bind statement creates a connection between anything in your app and the Firebase connection we just created.
   
  $scope.remoteGameContainer.$bind($scope, "gameContainer") ;

 // The bind statement will automatically update your model, in this case cellList, whenever it 
  // changes on Firebase.  But this will not trigger an Angular update of the interface (index.html)
  // - we've been relying on the ng-click to wake up Angular and get the gameboard refreshed.
  // So we put a watch on cellList - this tells Angular to refresh the interface elements, ie ng-class,
  // whenever the model, in this case celList, changes.
  $scope.$watch('gameContainer', function() {
    console.log('gameCountainer changed!') ;
  }) ;

  

  $scope.playerPicks = function(thisCell) {
    if($scope.gameContainer.winner!=true){  
      if(($scope.gameContainer.goesFirstCounter)%2 == 0) {
        if(thisCell.status != 'X' && thisCell.status != 'O') {  
            if (($scope.gameContainer.movecounter % 2) == 0) {
              thisCell.status = "X";  
              $scope.checkWinner();
            } 
            else {
              thisCell.status = "O";
              $scope.checkWinner();
            }
            $scope.gameContainer.movecounter++; 
        }
      }
      else {
        if(thisCell.status != 'X' && thisCell.status != 'O') { 
            if (($scope.gameContainer.movecounter % 2) == 0) {
              thisCell.status = "O";
              $scope.checkWinner();  
            } 
            else {
              thisCell.status = "X";
              $scope.checkWinner();
            }
            $scope.gameContainer.movecounter++;
        }
      }
    }
  };

  $scope.checkWinner = function() {
      if (

      ($scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[1].status && $scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[2].status) ||
      ($scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[3].status && $scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[6].status) ||
      ($scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[4].status && $scope.gameContainer.cellList[0].status === $scope.gameContainer.cellList[8].status) ||

      ($scope.gameContainer.cellList[1].status === $scope.gameContainer.cellList[4].status && $scope.gameContainer.cellList[1].status === $scope.gameContainer.cellList[7].status) ||

      ($scope.gameContainer.cellList[2].status === $scope.gameContainer.cellList[4].status && $scope.gameContainer.cellList[2].status === $scope.gameContainer.cellList[6].status) ||
      ($scope.gameContainer.cellList[2].status === $scope.gameContainer.cellList[5].status && $scope.gameContainer.cellList[2].status === $scope.gameContainer.cellList[8].status) ||
      ($scope.gameContainer.cellList[3].status === $scope.gameContainer.cellList[4].status && $scope.gameContainer.cellList[3].status === $scope.gameContainer.cellList[5].status) ||

      ($scope.gameContainer.cellList[6].status === $scope.gameContainer.cellList[7].status && $scope.gameContainer.cellList[6].status === $scope.gameContainer.cellList[8].status)

      )

      {
        if(($scope.gameContainer.goesFirstCounter)%2 == 0) {
          if (($scope.gameContainer.movecounter % 2) == 0) {
            $scope.gameContainer.testString = "Player X has Won!";
            $scope.gameContainer.winner=true;
            $scope.gameContainer.p1score++;
            console.log($scope.gameContainer.winner);
          }
          else {
            $scope.gameContainer.testString = "Player O has Won!";
            $scope.gameContainer.winner=true;
            $scope.gameContainer.p2score++;
            console.log($scope.gameContainer.winner);
          }
        }
        else {
          if (($scope.gameContainer.movecounter % 2) == 0) {
            $scope.gameContainer.testString = "Player O has Won!";
            $scope.gameContainer.winner=true;
            $scope.gameContainer.p2score++;
            console.log($scope.gameContainer.winner);
          }
          else {
            $scope.gameContainer.testString = "Player X has Won!";
            $scope.gameContainer.winner=true;
            $scope.gameContainer.p1score++;
            console.log($scope.gameContainer.winner);
          }
        }
      }
      else if ($scope.gameContainer.movecounter==8){
          $scope.gameContainer.testString = "Tie Game!";
      }
      // $scope.freeze();
    };
    // $scope.freeze = function() {
    //   if ($scope.testString === "Player X has Won!") {
    //     console.log("this is working");
    //   }
    //   else if ($scope.testString === "Player O has Won!") {
    //     console.log("this is working");
    //   }
    //   else if ($scope.testString === "Tie Game!") {
    //     console.log("this is working");
    //   }
    // };
$scope.switchFirst = function() {
  $scope.gameContainer.goesFirstCounter++;
  if(($scope.gameContainer.goesFirstCounter)%2 == 0) {
    $scope.gameContainer.displayString="X will go first this turn.";
  }
  else {
    $scope.gameContainer.displayString="O will go first this turn.";
  }
  if($scope.gameContainer.goesFirstCounter == 2) {
    $scope.gameContainer.goesFirstCounter=0;
  }
};

$scope.reset = function() {
    $scope.gameContainer.movecounter = 0;
    $scope.gameContainer.cellList=[
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
    $scope.gameContainer.testString = "";
    $scope.gameContainer.winner=false;
  };
$scope.resetScore = function() {
  $scope.gameContainer.movecounter = 0;
    $scope.gameContainer.cellList=[
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
    $scope.gameContainer.testString = "";
    $scope.gameContainer.p1score=0;
    $scope.gameContainer.p2score=0;
    $scope.gameContainer.goesFirstCounter=0;
    $scope.gameContainer.displayString="X will go first this turn.";
    $scope.gameContainer.winner=false;
  }
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