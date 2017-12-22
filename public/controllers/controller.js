angular.module("root",[])
	.controller("mainCtrl", ["$scope", "$http", function($scope, $http){
	    $scope.title = "Todo's";
	    $scope.current_id = "";
	    
	    var refresh = function(){
		    $http.get("/list").then(function(success){
		    	console.log("I got the data I requested");
		    	console.log(success);
		   		$scope.list = success.data;
		   		$scope.newItem = "";
		    });
		};

		refresh();

	    $scope.addItem = function(){
	        console.log($scope.newItem);
	        //post data must be in object/json format
	        $http.post("/list", {"item": $scope.newItem}).then(function(success){
	        	console.log("I inserted the data in database");
	        	console.log(success);
	        	refresh();
	        });
	    };

	    $scope.editItem = function(id){
	    	console.log("Edit Item id: " + id);
	    	$http.get("/list/"+ id).then(function(success){
	    		console.log(success);
	    		$scope.newItem = success.data.item;
	    		$scope.current_id = success.data._id;
	    	});
	    };

	    $scope.updateItem = function(){
	    	console.log("Update Item id: " + $scope.current_id);
	    	console.log($scope.newItem);
	    	$http.put("/list/" + $scope.current_id, {"item": $scope.newItem}).then(function(success){
	    		console.log("I updated the data in database");
	        	console.log(success);
	        	refresh();
	    	});
	    };



	    $scope.removeItem = function(id){
	    	console.log("Remove Item id: " + id);
	    	$http.delete('/list/' + id).then(function(success){
	    		console.log("I deleted the item");
	    		console.log(success);
	    		refresh();
	    	});
	    };

	    console.log("Hello World! from contrller");
	}])