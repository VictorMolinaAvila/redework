(function () {
    'use strict';

    angular.module('app.ui.form')
        .controller('curriculoCriarController', ['$scope', '$q', '$timeout', 'WizardHandler', '$window', '$mdDialog', '$state','curriculoCriarService', curriculoCriarController])
         .service('curriculoCriarService', function($http, $window) {

    this.buscaCep = function(busca){
        return $http.get("http://viacep.com.br/ws/"+busca+"/json/");
    }

    this.instituicao = function(){
        return $http.get("http://localhost:8091/instituicao/");
    }

    this.habilidades = function(){
        return $http.get("http://localhost:8091/habilidadeBanco/");
    }


    this.todasAreas = function(){
        return $http.get("http://localhost:8091/areaAtuacao/");
    }

    this.buscaCargo = function(id){
        return $http.get("http://localhost:8091/cargo/ObterCargosDaAreaDeAtuacaoSelecionada/"+id);
    }


    this.criarCurriculo = function(curriculo){

          var user_id = window.sessionStorage.getItem('user_id');

          $http.get('http://localhost:8091/candidato/'+user_id).then(function(response){

            curriculo.candidato = response.data;

            $http({
        url: 'http://localhost:8091/curriculo',
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




        

    function curriculoCriarController ($scope, $q, $timeout, WizardHandler, $window, $mdDialog, $state, curriculoCriarService) {
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

         $scope.curriculo.logradouro = undefined;
         $scope.curriculo.bairro = undefined;
         $scope.curriculo.localidade = undefined;
         $scope.curriculo.uf = undefined;


        /*Curriculo fim*/
                 curriculoCriarService.instituicao().then(function(d){

          $scope.instituicoes = d.data;
          
       
      });

         curriculoCriarService.habilidades().then(function(d){

          $scope.habilidades = d.data;
          
       
      });

        curriculoCriarService.todasAreas().then(function(d){

          $scope.areas = d.data;
          
       
      });

        $scope.buscaCep = function (busca) {
            //busca = JSON.parse(busca)
           curriculoCriarService.buscaCep(busca).then(function(d){

         $scope.curriculo.logradouro = d.data.logradouro;
         $scope.curriculo.bairro = d.data.bairro;
         $scope.curriculo.localidade = d.data.localidade;
         $scope.curriculo.uf = d.data.uf;
          
      });
            };

        $scope.buscaCargo = function (busca) {
            //busca = JSON.parse(busca)
           curriculoCriarService.buscaCargo(busca.id).then(function(d){

          $scope.cargos = d.data;
          
      });

           $scope.listaExperienciaProfissional[$scope.listaExperienciaProfissional.length - 1].areaAtuacao = busca.descricao;

           console.log($scope.listaExperienciaProfissional[$scope.listaExperienciaProfissional.length - 1].areaAtuacao);

        };






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

            $state.go('page/profile');
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
