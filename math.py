#!/bin/python3

import math
import os
import random
import re
import sys



#
# Complete the 'minNum' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER threshold
#  2. INTEGER_ARRAY points
#

def binary_search(points, low, high, key, ans):
    if (low < high):
        mid = (low + high) //2
        if (points[mid]==key):
            ans = mid
            return
        elif points[mid] >= key:
            ans = min(ans, mid)
            binary_search(points, low, mid - 1, key, ans)
        else:
            binary_search(points, mid+1, high, key, ans)

def minNum(threshold, points):
    # Write your code here
    if threshold + points[0] > points[len(points) - 1]:
        return len(points)
    
    key = threshold+points[0]
    ans = len(points)-1
    binary_search(points, 0, len(points)-1, key, ans)
    ans = ans+1
    res = (ans+2)//2
    return res

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    threshold = int(input().strip())

    points_count = int(input().strip())

    points = []

    for _ in range(points_count):
        points_item = int(input().strip())
        points.append(points_item)

    result = minNum(threshold, points)

    fptr.write(str(result) + '\n')

    fptr.close()


402
25
162
206
224
264
288
334
364
367
389
405
454
478
479
482
509
517
545
578
626
657
692
705
720
734
747

Your Output (stdout)
13
Expected Output

Download
10

def binary_search(points, low, high, key):
    ans = len(points)
    while low <= high:
        mid = low + (high - low) // 2
        if points[mid] >= key:
            ans = mid
            high = mid - 1
        else:
            low = mid + 1
    return ans

def minNum(threshold, points):
    n = len(points)
    if points[0] + threshold > points[-1]:
        return n
    
    index = binary_search(points, 0, n - 1, points[0] + threshold)
    
    if index == n:
        return n
    
    min_problems_solved = (index // 2) + 1
    if index % 2 == 1:
        min_problems_solved += 1
    
    return min_problems_solved

threshold = 402
points = [25, 162, 206, 224, 264, 288, 334, 364, 367, 389, 405, 454, 478, 479, 482, 509, 517, 545, 578, 626, 657, 692, 705, 720, 734, 747]
minNum(threshold, points)
