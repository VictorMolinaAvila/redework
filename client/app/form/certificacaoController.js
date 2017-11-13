(function () {
    'use strict';

    angular.module('app.ui.form')
        .controller('certificacaoController', ['$scope', '$window', '$mdDialog','certificacaoService', certificacaoController])
         .service('certificacaoService', function($http, $window) {

  this.criarCertificacao = function(certificacao){

          var user_id = window.sessionStorage.getItem('user_id');

          $http.get('http://localhost:8090/candidato/'+user_id).then(function(response){
console.log(response.data);
         


            $http({
        url: 'http://localhost:8090/certificacao',
        method: "POST",
        data: certificacao
    })
    .then(function(d) {
            return console.log(d);
    },
    function(response) { // optional
            // failed
    });
      });



        
    }
  
      });   

    function certificacaoController ($scope, $window, $mdDialog, certificacaoService) {
   
        $scope.criarCertificacao = function(certificacao){
            certificacaoService.criarCertificacao(certificacao);
        }
         $scope.listaCertificacao = [{certificacaoIndex:1}];


        $scope.adicionarCertificacao = function() {

             var newItemNo = $scope.listaCertificacao.length+1;
        $scope.listaCertificacao.push({'certificacaoIndex': newItemNo});
        };

       
        $scope.removerCertificacao = function (ev){
              var confirm = $mdDialog.confirm()
                        .title('Realmente deseja remover?')
                        .targetEvent(ev)
                        .ok('Remover')
                        .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {

                
                 var lastItem = $scope.listaCertificacao.length-1;
            $scope.listaCertificacao.splice(lastItem);



            });
         
        };

    }
})(); 
