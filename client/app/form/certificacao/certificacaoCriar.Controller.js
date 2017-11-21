(function () {
    'use strict';

    angular.module('app')
        .controller('certificacaoCriarController', ['$scope', '$window', '$mdDialog', '$state', 'certificacaoCriarService', certificacaoCriarController])
         .service('certificacaoCriarService', function($http, $window, $state) {

  this.criarCertificacao = function(certificacao){

          var user_id = window.sessionStorage.getItem('user_id');

          $http.get('http://localhost:8091/candidato/'+user_id).then(function(d){
            
            
            certificacao.candidato = d.data;
            console.log(certificacao.candidato)

            $http({
        url: 'http://localhost:8091/certificacao',
        method: "POST",
        headers: {
           'Content-Type': 'application/json'
         },
        data: certificacao
    })
    .then(function(d) {
             //$state.go('form/certificacao');
    },
    function(response) { // optional
            // failed
    });
      });

        
    }
  
      });   

    function certificacaoCriarController ($scope, $window, $mdDialog, $state, certificacaoCriarService) {
   
        $scope.criarCertificacao = function(certificacao){
            certificacaoCriarService.criarCertificacao(certificacao);

          $state.go('page/profile');
        }
         $scope.listaCertificacao = [{certificacaoIndex:1}];


        $scope.voltar = function() {

             $state.go("certificacao");
        };

    }
})(); 
