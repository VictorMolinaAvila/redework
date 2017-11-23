(function () {
    'use strict';

    angular.module('app')
        .controller('certificacaoEditarController', ['$scope', '$window', '$mdDialog', '$stateParams', 'certificacaoEditarService', certificacaoEditarController])
         .service('certificacaoEditarService', function($http, $window) {

  this.obterCertificacao = function(id){
    return $http.get("http://localhost:8091/certificacao/"+id);
  }

  this.editarCertificacao = function(certificacao){
console.log(certificacao);
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
        
    }

      });   

    function certificacaoEditarController ($scope, $window, $mdDialog, $stateParams, certificacaoEditarService) {

      certificacaoEditarService.obterCertificacao($stateParams.id).then(function(d){

          $scope.certificacao = d.data;
       
      });
   
        $scope.editarCertificacao = function(certificacao){
            certificacaoEditarService.editarCertificacao(certificacao);
        }
         $scope.listaCertificacao = [{certificacaoIndex:1}];

    }
})(); 
