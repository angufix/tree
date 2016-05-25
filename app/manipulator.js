'use strict';

angular.module('treeApp')
.controller
(
    "ManipulatorCtl",
    [
        '$scope', 'TreeService',
        function(scope, Tree)
        {
            Tree.getTreeData('assets/treeData.json').then
            (
                function(data)
                {
                    scope.treeData = data;
                    console.info('treeData', scope.treeData);
                    var needle = scope.nodeById(1234);
                    console.info('nodeById', needle);
                    needle.label = 'found 1234';
                }
            );

            scope.nodeById = function(id)
            {
                return findNode(id, scope.treeData);
            };

            function findNode(id, nodes)
            {
                for (var i in nodes)
                {
                    var node = nodes[i];
                    if(node.id === id)
                    {
                        return node;
                    }

                    var n = findNode(id, node.children);
                    if(n) {
                         return n;
                    }
                };
                return null;
            }

            scope.setNewName = function()
            {
                var found = scope.nodeById(scope.nodeId);
                found.label = scope.newName;
            };

            //to be continued
            scope.changeParent = function ()
            {
                //1) change tree data
                // var node = scope.nodeById(scope.nodeId);
                // node.parentId = scope.newParentId;

                //2) updadte/rerender the tree
            }
        }
    ]
)
