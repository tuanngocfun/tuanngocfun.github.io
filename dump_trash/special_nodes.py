#!/bin/python3

import math
import os
import random
import re
import sys



#
# Complete the 'isSpecial' function below.
#
# The function is expected to return an INTEGER_ARRAY.
# The function accepts UNWEIGHTED_INTEGER_GRAPH tree as parameter.
#

#
# For the unweighted graph, <name>:
#
# 1. The number of nodes is <name>_nodes.
# 2. The number of edges is <name>_edges.
# 3. An edge exists between <name>_from[i] and <name>_to[i].
#
#
def find_max_far_node(graph, start):
    visited = [False] * len(graph)
    max_dist = -1
    max_far_node = start
    queue = [(start, 0)]
    
    while queue:
        curr, dist = queue.pop(0)
        
        if dist > max_dist:
            max_dist = dist
            max_far_node = curr
            
        visited[curr] = True
        for neigh in graph[curr]:
            if not visited[neigh]:
                queue.append((neigh, dist+1))
    return max_far_node, max_dist

def isSpecial(tree_nodes, tree_from, tree_to):
    # Write your code here
    graph = [[] for _ in range(tree_nodes)]
    for u, v in zip(tree_from, tree_to):
        graph[u-1].append(v-1)
        graph[v-1].append(u-1)
        
    max_far_node, _ = find_max_far_node(graph, 0)
    other_end, _ = find_max_far_node(graph, max_far_node)
    special_node = [0]*tree_nodes
    
    special_node[max_far_node] = 1
    special_node[other_end] = 1
    
    return special_node

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    tree_nodes, tree_edges = map(int, input().rstrip().split())

    tree_from = [0] * tree_edges
    tree_to = [0] * tree_edges

    for i in range(tree_edges):
        tree_from[i], tree_to[i] = map(int, input().rstrip().split())

    result = isSpecial(tree_nodes, tree_from, tree_to)

    fptr.write('\n'.join(map(str, result)))
    fptr.write('\n')

    fptr.close()

# 7 6
# 1 2
# 2 3
# 3 4
# 3 5
# 1 6
# 1 7
# Your Output (stdout)
# 0
# 0
# 0
# 1
# 0
# 1
# 0
# Expected Output

# Download
# 0
# 0
# 0
# 1
# 1
# 1
# 1
def bfs(graph, start_node):
    visited = [False] * len(graph)
    queue = [(start_node, 0)]
    visited[start_node] = True
    max_distance_nodes = []
    max_distance = 0

    while queue:
        current_node, distance = queue.pop(0)

        if distance > max_distance:
            max_distance = distance
            max_distance_nodes = [current_node]
        elif distance == max_distance:
            max_distance_nodes.append(current_node)

        for neighbor in graph[current_node]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append((neighbor, distance + 1))

    return max_distance_nodes, max_distance


def isSpecial(tree_nodes, tree_from, tree_to):
    graph = [[] for _ in range(tree_nodes)]
    for u, v in zip(tree_from, tree_to):
        graph[u - 1].append(v - 1)
        graph[v - 1].append(u - 1)

    far_nodes, _ = bfs(graph, 0)
    first_end_point = far_nodes[0]

    far_nodes_from_first, _ = bfs(graph, first_end_point)
    second_end_point = far_nodes_from_first[0]

    far_nodes_from_second, _ = bfs(graph, second_end_point)

    special_nodes = set(far_nodes_from_first + far_nodes_from_second)

    result = [1 if i in special_nodes else 0 for i in range(len(graph))]

    return result