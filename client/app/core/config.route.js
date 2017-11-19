(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
                function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
                var routes, setRoutes;

                routes = [
                    'ui/cards', 'ui/typography', 'ui/buttons', 'ui/icons', 'ui/grids', 'ui/widgets', 'ui/components', 'ui/timeline', 'ui/lists', 'ui/pricing-tables',
                    'table/static', 'table/responsive', 'table/data',
                    'form/elements', 'form/layouts', 'form/validation',
                    'chart/echarts', 'chart/echarts-line', 'chart/echarts-bar', 'chart/echarts-pie', 'chart/echarts-scatter', 'chart/echarts-more',
                    'page/404', 'page/500', 'page/blank', 'page/forgot-password', 'page/invoice', 'page/lock-screen', 'page/profile', 'page/signin', 'page/signup',
                    'app/calendar'
                ]

                setRoutes = function(route) {
                    var config, url;
                    url = '/' + route;
                    config = {
                        url: url,
                        templateUrl: 'app/' + route + '.html'
                    };
                    $stateProvider.state(route, config);
                    return $stateProvider;
                };

                routes.forEach(function(route) {
                    return setRoutes(route);
                });


                $stateProvider
                    .state('user', {
                        url: '/user/{id_token}',
                        controller: 'userController'
                    })
                    .state('dashboard', {
                        url: '/dashboard',
                        templateUrl: 'app/dashboard/dashboard.html',
                    })
                    .state('form/editor', {
                        url: '/form/editor',
                        templateUrl: "app/form/editor.html",
                        resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'textAngular'
                                ]);
                            }]
                        }
                    })
                    .state('curriculo', {
                        url: '/curriculo',
                        templateUrl: "app/form/curriculo/view/curriculoListar.html",
                        controller:'curriculoListarController'

                    })
                    .state('curriculo/criar', {
                        url: '/curriculo/criar',
                        templateUrl: "app/form/curriculo/view/curriculoCriar.html",
                        controller:'curriculoCriarController',
                         resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angular-wizard'
                                ]);
                            }]
                        }
                    })
                    .state('curriculo/editar', {
                        url: '/curriculo/editar/{id}',
                        templateUrl: "app/form/curriculo/view/curriculoEditar.html",
                        controller:'curriculoEditarController',
                         resolve: {
                            deps: ['$ocLazyLoad', function($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angular-wizard'
                                ]);
                            }]
                        }
                    })
                    .state('certificacao', {
                        url: '/certificacao',
                        templateUrl: "app/form/certificacao/view/certificacaoListar.html",
                        controller: "certificacaoListarController"
                       
                    })
                    .state('certificacao/criar', {
                        url: '/certificacao/criar',
                        templateUrl: "app/form/certificacao/view/certificacaoCriar.html",
                        controller: "certificacaoCriarController"
                       
                    })
                    .state('certificacao/editar', {
                        url: '/certificacao/editar/{id}',
                        templateUrl: "app/form/certificacao/view/certificacaoEditar.html",
                        controller: "certificacaoEditarController"
                       
                    })
                    .state('selecao', {
                        url: '/selecao',
                        templateUrl: "app/page/selecao.html"
                    })
                    .state('map/maps', {
                        url: '/map/maps',
                        templateUrl: "app/map/maps.html",

                    });

                $urlRouterProvider
                    .when('/', '/user/{id_token}')
                    .otherwise('/page/profile');
            }
        ]);

})(); 