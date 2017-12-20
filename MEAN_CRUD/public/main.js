//ngRoute module provides routing and deeplinking services and directives for angular apps
//angular.module is a global place for creating, registering and retrieving Angular modules

var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(function($routeProvider) {
    
	
    $routeProvider
	    .when('/home',{
			templateUrl:'home.html',
			controller:'homeCtrl'
			
		})
		.when('/registration',{
			templateUrl:'registration.html',
			controller:'regCtrl'
			
		})
		.when('/login',{
			templateUrl:'login.html',
			controller:'logCtrl'
			
		})
		
        .when('/create', {
            templateUrl: 'create.html',
            controller: 'CreateCtrl'
        })
		 .when('/retrieve', {
            templateUrl: 'retrieve.html',
            controller: 'retrievectrl'
        })
		.when('/delete', {
            templateUrl: 'delete.html',
            controller: 'DeleteCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
});
mainApp.controller('homeCtrl',function($scope,$location){
	$scope.register=function(){
		$location.path('/registration');
	}
	$scope.login=function(){
		$location.path('/login');
	}
	
});
mainApp.controller('regCtrl',function($scope,$location,$http){
	$scope.SignUp = function()
		{
			$http.post("http://localhost:8000/signUp",
			{
				"FirstName":$scope.firstName,
				"LastName":$scope.lastName,
				"MiddleName":$scope.middleName,
				"Email":$scope.email,
				"Password":$scope.Password,
				"PhoneNumber":$scope.PhoneNumber
			}
			).then(function(response)
			{
				if(response.status==200)
				{
					//alert(JSON.stringify(response));
					alert('Successfully Signed Up');								
					$location.path('/login');
				}
				else
				{
					alert('Failed to signup');
				}
			})
		}
		
	
});
mainApp.controller('logCtrl',function($scope,$location,$http){
			$scope.login=function()
		{
			$http.post("http://localhost:8000/login",
			{
				"Email":$scope.username,
				"Password":$scope.Password
			}).then(function(response){
				//alert(JSON.stringify(response))
				if(response.data=="no Data")
				{
					alert('Failed to signed In');
					$location.path('/contact');
				}
				else
				{
					alert('Successfully signed in');
					$location.path('/create');
				}
				
			})
		}
		
	
});

mainApp.controller('CreateCtrl', function($scope,$http,$location) {
    $scope.insert = function() {
	   var name=$scope.name
	   var empid=$scope.empid
	   var email=$scope.email
	   var salary=$scope.salary
	   var docid=$scope.email
	   
       //alert(a+""+b+""+c+""+d)
	   alert(name+""+empid+""+email+""+salary+""+docid)
	   var data={
		   "_id":docid,
		   "name":name,
		   "empid":empid,
		   "email":email,
		   "salary":salary
	   }
	   
	   $http.post('http://localhost:8000/getexample',data).then(function(result){
		  if(result.data.error==undefined)
		  {
			  alert("data insert Successfully....")
			  //$location.path('/retrieve');
	      }
     else{
	alert("data insert Failed")
	}		  
	   })
	   
    }
});
mainApp.controller('DeleteCtrl' ,function($scope,$http){
	$scope.delete=function()
	{
		var email=$scope.email;
		alert(email);
		var name={
			"email":email
		}
		alert(JSON.stringify(name))
		$http.post('http://localhost:8000/delete',name).then(function(result){
			if(result.data.error==undefined){
				alert(JSON.stringify(result.data.output))	
				alert("data delete successfully");
				}
			else{
				alert("Failed")}
		})
		
	}
});

mainApp.controller('retrievectrl',function($scope,$http,$location){
	$scope.retrieve=function()
	{
		var email=$scope.email;
		alert("working");
		alert(email);
		var name={
			"email":email
		}
		alert(JSON.stringify(name))
		$http.post('http://localhost:8000/retrieve',name).then(function(result){
			if(result.data.error==undefined){
				alert(JSON.stringify(result.data.output));			
				$scope.res=result.data.output
				}
				
			else{
				alert("Failed")}
		})
	}

	
	$scope.update=function(x)
	{
		alert("working");
		var name={
			
			"Name":x.Name,
			"empid":x.empid,
			"email":x.email,
			"salary":x.salary
		}
		alert(JSON.stringify(name))
		$http.post('http://localhost:8000/update',name).then(function(result){
			if(result.data.error==undefined)
			{
				alert(JSON.stringify(result.data.output));
				
				alert("data updated successfully");
				$location.path('/create');
		}
			else
				alert("Failed")
		});
	}
});