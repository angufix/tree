'use strict';

angular.module('treeApp')
.factory
(
    'TreeService',
    [
        '$http', '$q',
        function(http, q)
        {
            var self= {
                getTreeData: function(url)
                {
                    return http.get(url).then
                    (
                        function (response)
                        {
                            http.put(url, response[0]);

                            var nodes = response.data;
                            //1) build up tree structure for reqcursion
                            var roots = self.getRootNodes(nodes);

                            var tree = roots.map
                            (
                                function (rootNode)
                                {
                                    return self.createNode(rootNode, nodes);
                                }
                            );

                            //2) return transformed tree
                            return tree;
                        }
                    );
                },

                createNode: function (node, nodes)
                {
                    node.children = nodes.filter
                    (
                        function(childNode)
                        {
                            if(childNode.parentId === node.id)
                            {
                                return self.createNode(childNode, nodes);
                            }
                        }
                    );
                    return node;
                },

                getRootNodes: function (nodes)
                {
                    return nodes.filter
                    (
                        function(node)
                        {
                            return node.parentId === -1;
                        }
                    );
                },

            };
            return self;
        }
    ]
);
