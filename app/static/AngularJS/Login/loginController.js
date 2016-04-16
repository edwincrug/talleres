registrationModule.controller('loginController', function($scope){
	var vuser = 'admin'
	var vpassword = '12345admin';

	$scope.init = function(){

	}

	$scope.login = function(user, password){
		if(vuser == user &&  vpassword == password)
		{
			location.href = '/cita';
		}
	}
});