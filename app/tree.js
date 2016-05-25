'use strict';

angular.module('treeApp')
.directive
(
    "setfocus",
    function()
    {
        return {
            restrict: "A",
            link: function(scope, element, attrs)
            {
                element[0].focus();
                console.log(element[0]);
            }
        };
    }
)
.directive
(
    'tree',
    [
        'TreeService',
        function(Tree)
        {
            return {
                scope:{
                    data: '='
                },
                templateUrl:'./app/tree.html',
                controller: [
                    '$scope',
                    function(scope)
                    {


                        scope.onKeyPressed = function(event, node)
                        {
                            switch(event.which)
                            {
                                case 13:
                                    node.isedited=false;
                                    break;
                            }
                        };

                        scope.openEditbox = function(node)
                        {
                            node.isedited=true;
                        };

                        scope.closeEditbox = function(node)
                        {
                            node.isedited=false;
                        };

                        scope.toggleChildren = function (node)
                        {
                            //d not show children if they not exist
                            if(node.children.length<1)
                            {
                                node.showchildren = false;
                                return;
                            }

                            return node.showchildren=!node.showchildren;
                        };

                        scope.nodeIconClass = function(node)
                        {
                            var cssClass = node.children.length ? 'pointer '  + (node.showchildren ? 'glyphicon-folder-open' : 'glyphicon-folder-close') : 'glyphicon-file';
                            return cssClass;
                        };

                        scope.nodeType = function(node)
                        {
                            return node.type && node.type ==='number' ? 'number' : 'text';
                        }


                    


                    }
                ]
            };
        }
    ]
);
