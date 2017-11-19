(function () {
    'use strict';

    angular.module('app.ui.form')
        .controller('curriculoCriarController', ['$scope', '$q', '$timeout', 'WizardHandler', '$window', '$mdDialog','curriculoCriarService', curriculoCriarController])
         .service('curriculoCriarService', function($http, $window) {

    var curriculo = $http.get('http://localhost:8090/curriculo').then(function(d){
            console.log(d.data)
      });

    this.criarCurriculo = function(curriculo){

          var user_id = window.sessionStorage.getItem('user_id');

          $http.get('http://localhost:8090/candidato/'+user_id).then(function(response){

            curriculo.candidato = response.data;

            $http({
        url: 'http://localhost:8090/curriculo',
        method: "POST",
        data: curriculo
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




        

    function curriculoCriarController ($scope, $q, $timeout, WizardHandler, $window, $mdDialog, curriculoCriarService) {
        $scope.stepActive = true;
        $scope.listaFormacao = [{formacaoIndex:1}];
        $scope.listaIdioma = [{idiomaIndex:1}];
        $scope.listaExperienciaProfissional = [{experienciaProfissionalIndex:1}];
        $scope.listaHabilidade = [{habilidadeIndex: 1}];

        /*Curriculo inicio*/
        $scope.curriculo={};
        $scope.curriculo.formacoes = $scope.listaFormacao;
        $scope.curriculo.idiomas = $scope.listaIdioma;
        $scope.curriculo.experienciasProfissionais = $scope.listaExperienciaProfissional;
        $scope.curriculo.habilidades = $scope.listaHabilidade;


        /*Curriculo fim*/

        $scope.adicionarFormacao = function() {
            var newItemNo = $scope.listaFormacao.length+1;
        $scope.listaFormacao.push({'formacaoIndex': newItemNo});
        };

        $scope.removerFormacao = function(ev){


                          var confirm = $mdDialog.confirm(ev)
                        .title('Realmente deseja remover?')
                        .targetEvent(ev)
                        .ok('Remover')
                        .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                
          var lastItem = $scope.listaFormacao.length-1;
            $scope.listaFormacao.splice(lastItem);
             });
        };

        $scope.adicionarIdioma = function() {
            var newItemNo = $scope.listaIdioma.length+1;
        $scope.listaIdioma.push({'idiomaIndex': newItemNo});
        };

        $scope.removerIdioma = function(ev){

                          var confirm = $mdDialog.confirm()
                        .title('Realmente deseja remover?')
                        .targetEvent(ev)
                        .ok('Remover')
                        .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                
          var lastItem = $scope.listaIdioma.length-1;
            $scope.listaIdioma.splice(lastItem);
             });
        };

        $scope.adicionarExperienciaProfissional = function() {
        var newItemNo = $scope.listaExperienciaProfissional.length+1;
        $scope.listaExperienciaProfissional.push({'experienciaProfissionalIndex': newItemNo});
        };

        $scope.removerExperienciaProfissional = function(ev){

                          var confirm = $mdDialog.confirm()
                        .title('Realmente deseja remover?')
                        .targetEvent(ev)
                        .ok('Remover')
                        .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                
          var lastItem = $scope.listaExperienciaProfissional.length-1;
            $scope.listaExperienciaProfissional.splice(lastItem);
             });
        };

        $scope.adicionarHabilidade = function() {
        var newItemNo = $scope.listaHabilidade.length+1;
        $scope.listaHabilidade.push({'habilidadeIndex': newItemNo});
        };

        $scope.removerHabilidade = function(ev){

                          var confirm = $mdDialog.confirm()
                        .title('Realmente deseja remover?')
                        .targetEvent(ev)
                        .ok('Remover')
                        .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                
          var lastItem = $scope.listaHabilidade.length-1;
            $scope.listaHabilidade.splice(lastItem);
             });
        };

        $scope.criarCurriculo = function(curriculo) {

                   curriculoCriarService.criarCurriculo(curriculo);

       
        };



        $scope.finished = function() {
            alert("Wizard finished :)");
        };
        $scope.logStep = function() {

            console.log("Step continued");
        };
        $scope.goBack = function() {
            WizardHandler.wizard().goTo(0);
        };
        $scope.exitWithAPromise = function() {
            var d = $q.defer();
            $timeout(function() {
                d.resolve(true);
            }, 1000);
            return d.promise;
        };
        $scope.exitToggle = function() {
            $scope.canExit = !$scope.canExit;
        };
        $scope.stepToggle = function() {
            $scope.stepActive = !$scope.stepActive;
        }
        $scope.exitValidation = function() {
            return $scope.canExit;
        };
    }
})(); 
