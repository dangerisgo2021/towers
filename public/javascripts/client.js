var app = angular.module('Client', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html'
		})
		.when('/about', {
			templateUrl: 'partials/about.html'
		})
		.when('/login', {
			templateUrl: 'partials/login.html'
		})
		.when('/register', {
			templateUrl: 'partials/register.html'
		})
		.when('/games', {
			templateUrl: 'partials/games.html'
			, controller: 'GamesCtrl'
		})
		.when('/game/:id', {
			templateUrl: 'partials/game.html'
			, controller: 'GameCtrl'

		})
		.when('/player', {
			templateUrl: 'partials/player.html'
		  , controller: 'ProfileSearchCtrl'

		})
		.when('/player/:id', {
			templateUrl: 'partials/player.html'
			, controller: 'ProfileCtrl'
		})
		.when('/player/edit/:id/', {
			templateUrl: 'partials/player.html'
			, controller: 'ProfileCtrl'
		})
}]);

app.controller('GamesCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location) {
		var Games = $resource('/app/game');
		Games.query(function(games) {
			$scope.games = games
		});

		$scope.save = function() {
			Games.save($scope.game, function(game) {
				$scope.games.push(game)
			})
		};

		$scope.selectGame = function(game) {
			$location.path('/game/' + game._id)
		}
	}
]);

app.controller('GameCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams) {
		var Game = $resource('/app/game/:id'
			, { id: '@_id' }
			, { update: { method: 'PUT' }});

		Game.get({id :  $routeParams.id }, function(game) {
			$scope.game = game;
			createTowersGrid(game);
			isoRender(game);
			$scope.currentMove.color = game.currentColor;
		});

		$scope.actionOptions = [
			{ name:'BUILD' }
			, { name:'PUSH' }
		];

		$scope.directionOptions = [
			{ name:'UP' }
			, { name:'DOWN' }
			, { name:'LEFT' }
			, { name:'RIGHT' }
		];

		$scope.currentMove = {
			color       : ''
			, action    : $scope.actionOptions[0]
			, x         : 0
			, y         : 0
			, direction : $scope.directionOptions[0]
		};

		function isoRender(game) {
			var Shape = Isomer.Shape
				, Point     = Isomer.Point
				, canvas    = document.getElementById("isoBoard")
				, context   = canvas.getContext('2d')
				, isoBoard  = new Isomer(canvas);


			function determinePieceColor(piece) {
				var isoGreen  = new Isomer.Color(50, 160, 60)
					, isoBlue = new Isomer.Color(50, 60, 160)
					, isoRed  = new Isomer.Color(160, 50, 60);

				if (piece.color === 'WHITE') {
					return isoRed;
				} else if (piece.color === 'BLACK') {
					return isoBlue;
				} else if (piece.color === 'GREEN') {
					return isoGreen;
				}
			}

			//Clear previous frame
			context.clearRect(0, 0, canvas.width, canvas.height);

			//Base
			var baseHeight = .1;
			basePosition = new Point(0, 0, -baseHeight);

			isoBoard.add(Shape.Prism(basePosition, game.boardSize.rows, game.boardSize.cols, .1));

			//Pieces
			var pieceWidth = .5;
			//isoBoard.add(Shape.Prism(new Point(0, 0, 0), 1, 1, pieceWidth),  new Isomer.Color(50, 160, 60));
			var reverseTowersList = game.towers.reverse();
			for (var i = 0; i < reverseTowersList.length; i++) {
				var tower = reverseTowersList[i];
				for (var j = 0; j < tower.pieces.length; j++) {
					var piece = tower.pieces[j];
					var pieceColor = determinePieceColor(piece);
					isoBoard.add(
						Shape.Prism(new Point(tower.x, tower.y, j * pieceWidth)
							, 1, 1, pieceWidth)
						, pieceColor);
				}
			}
		}

		function createTowersGrid(game) {

			if(game.towers) {
				for (var x = 0; x < game.towers.length; x++) {
					var tower = game.towers[x];
					if (tower.pieces == 0) {
						tower.display = '[0]'
					} else {
						tower.display =
							'['
							+ tower.pieces.length
							+ tower.pieces[tower.pieces.length - 1].color[0]
							+ ']';
						tower.controlColor = tower.pieces[tower.pieces.length - 1].color
					}
				}

				var towersGrid = [];
				for (i = 0; i < game.boardSize.rows; i++) {
					var towerRow = [];
					for (j = 0; j < game.boardSize.cols; j++) {
						towerRow[j] = game.towers[i * game.boardSize.rows + j]
					}
					towersGrid.push(towerRow)
				}
				$scope.board = towersGrid
			}
		}

		function sendGameAction(type, move) {
			var action = {};
			action.type = type;
			if(move) {
				action.move = move
			}
			Game.update({ _id :  $routeParams.id, action: action},
				function(game) {
					createTowersGrid(game);
					isoRender(game);
					$scope.game = game;
					$scope.currentMove.color = game.currentColor;
				}
			)
		}



		//$scope.refresh = refresh;

		$scope.clear = function() {
			sendGameAction('clear')
		};

		$scope.delete = function() {
			Game.delete({id :  $routeParams.id }, function() {
				$location.path('/games')
			})
		};

		$scope.startGame = function() {
			sendGameAction('start')
		};

		$scope.submitTurn = function() {
			var move = {
				x           : $scope.currentMove.x
				, y         : $scope.currentMove.y
				, color     : $scope.currentMove.color
				, type      : $scope.currentMove.action.name
				, direction : $scope.currentMove.direction.name
			};

			sendGameAction('turn', move);
		};
	}]
);

app.controller('ProfileSearchCtrl', ['$scope', '$resource', '$location',
	function($scope, $resource, $location) {
		var Profile = $resource('/app/player');
		Profile.get(function(profile) {
			$location.path('/player/' + profile._id)
		});
	}
]);

app.controller('ProfileCtrl', ['$scope', '$resource', '$location', '$routeParams',
	function($scope, $resource, $location, $routeParams) {
		var Profile = $resource(
			'/app/player/:id'
			, { id: '@_id' }
			, { update: { method: 'PUT' } });
		Profile.get({ _id: $routeParams.id }, function(profile) {
			$scope.profile = profile
		});

		$scope.save = function() {
			Profile.update($scope.profile)
		}
	}
]);