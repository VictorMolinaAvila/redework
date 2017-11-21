(function () {
    'use strict';

    angular.module('app')
        .controller('userController', ['$scope','$stateParams', '$state', '$window','userService', userController])
        .service('userService', function($http, $window) {

 
    this.user = function(id_token){
        $http({
        url: 'https://redework.auth0.com/tokeninfo',
        method: "POST",
        data: {'id_token':id_token}
    })
    .then(function(response) {

    	console.log(response.data);
    	var id = response.data.user_id;
    	var nome = response.data.name;
    	var email = response.data.email;
    	var foto; 
    	if(response.data.identities[0].connection == "redework"){
    		var foto = response.data.picture;
    		console.log("redework"+foto);
    	}

    	if(response.data.identities[0].connection == "google-oauth2"){
    		var foto = response.data.picture;
    		console.log("google"+foto);
    	}

    	if(response.data.identities[0].connection == "linkedin"){
    		var foto = response.data.pictureUrls.values[0];
    		console.log("linkedin"+foto);
    	}

    	if(response.data.identities[0].connection == "facebook"){
			var foto = response.data.picture_large;
			console.log("face"+foto);
    	}


        $window.sessionStorage.clear();
        window.sessionStorage.setItem('user_id', id);

    	$http({
        url: 'http://localhost:8091/candidato',
        method: "POST",
        data: {"user_id":id , "nome":nome, "email":email, "foto":foto}
    })
    .then(function(response) {

    },
    function(response) { // optional
            // failed
    });


    },
    function(response) { // optional
            // failed
    });
    
    }

});

    function userController($scope, $stateParams, $state, $window, userService) {
         userService.user($stateParams.id_token);


 
        $state.go('page/profile');



        //var usuario = window.sessionStorage.getItem('usuario');
    }

})(); 