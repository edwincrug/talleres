// -- =============================================
// -- Author:      Vladimir Juárez
// -- Create date: 18/03/2016
// -- Description: example controller
// -- Modificó: 
// -- Fecha: 
// -- =============================================
registrationModule.controller('exampleController', function($scope, alertFactory){
	//this is the first method executed in the view
	$scope.init = function(){
		$scope.hello = "Hello, Angular is ready! XD  :)  :(";
	}

	//all the logic for the view
	$scope.sayHello = function(){
		alertFactory.success($scope.hello);
	}
});