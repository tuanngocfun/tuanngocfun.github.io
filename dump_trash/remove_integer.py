#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'removeIntegers' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER N
#  2. INTEGER P
#  3. INTEGER Q
#  4. INTEGER_ARRAY special_integers
#

def removeIntegers(N, P, Q, special_integers):
    mod = 10**9 + 7
    special_integers = set(special_integers)
    dp = [float('inf')] * (2**N)

    def cost(segment):
        segment_set = set(segment)
        if len(segment_set & special_integers) == 0:
            return Q * len(segment)
        else:
            return P * len(segment_set & special_integers) + Q * (len(segment) - len(segment_set & special_integers))

    def solve(mask):
        if dp[mask] != float('inf'):
            return dp[mask]

        segment = []
        for i in range(N):
            if (mask & (1 << i)):
                segment.append(i + 1)

        dp[mask] = cost(segment)
        if len(segment) % 2 == 0:
            mid = len(segment) // 2
            left_mask = right_mask = 0
            for i in range(mid):
                left_mask |= (1 << (segment[i] - 1))
                right_mask |= (1 << (segment[i + mid] - 1))
            dp[mask] = min(dp[mask], solve(left_mask) + solve(right_mask))

        return dp[mask]

    return solve((1 << N) - 1) % mod
    
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    N = int(input().strip())

    P = int(input().strip())

    Q = int(input().strip())

    special_integers_count = int(input().strip())

    special_integers = []

    for _ in range(special_integers_count):
        special_integers_item = int(input().strip())
        special_integers.append(special_integers_item)

    result = removeIntegers(N, P, Q, special_integers)

    fptr.write(str(result) + '\n')

    fptr.close()

Input (stdin)

Run as Custom Input
|
Download
3
2
1
8
1
2
3
4
5
6
7
8
Your Output (stdout)
6
Expected Output

Download
16
def removeIntegers(N, P, Q, special_integers):
    total_integers = 1 << N  
    mod = 10**9 + 7

    memo = {}

    def count_specials_in_segment(start, end):
        count = 0
        for special in special_integers:
            if start <= special <= end:
                count += 1
        return count

    def find_min_cost(start, end):
        if (start, end) in memo:
            return memo[(start, end)]

        if start == end:
            if start in special_integers:
                return P
            else:
                return Q

        specials_count = count_specials_in_segment(start, end)

        if specials_count == 0:
            return Q

        segment_length = end - start + 1
        cost_with_specials = segment_length * specials_count * P

        if segment_length % 2 == 0:
            mid = (start + end) // 2
            cost_split = (find_min_cost(start, mid) + find_min_cost(mid + 1, end)) % mod
            min_cost = min(cost_with_specials, cost_split)
        else:
            min_cost = cost_with_specials

        memo[(start, end)] = min_cost % mod
        return min_cost % mod

    return find_min_cost(1, total_integers)

# Test the function with a sample input
N_test = 3
P_test = 2
Q_test = 1
special_integers_test = [1, 3, 7]

# Run the removeIntegers function with the test inputs
removeIntegers(N_test, P_test, Q_test, special_integers_test)

#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'removeIntegers' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER N
#  2. INTEGER P
#  3. INTEGER Q
#  4. INTEGER_ARRAY special_integers
#

def removeIntegers(N, P, Q, special_integers):
    mod = 10**9 + 7
    total_integers = 1 << N
    memo={}

    def count_specials_in_seg(start,end):
        cnt = 0
        for special in special_integers:
            if start <= special <= end:
                cnt += 1
        return cnt
        
    def find_min_cost(start,end):
        if (start, end) in memo:
            return [(start,end)]
            
        if start == end:
            if start in special_integers:
                return P
            else:
                return Q
                
        special_cnt = count_specials_in_seg(start,end)
        
        if special_cnt==0:
            return Q
            
        seg_len = end - start + 1
        cost_with_specials = seg_len * special_cnt * P
        
        if seg_len % 2==0:
            mid = (start+end)//2
            cost_split = (find_min_cost(start,mid)+find_min_cost(mid+1,end)) % mod
            min_cost = min(cost_with_specials, cost_split)
        else:
            min_cost = cost_with_specials
        
        memo[(start,end)] = min_cost%mod
        return min_cost%mod
    return find_min_cost(1, total_integers)
        

    
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    N = int(input().strip())

    P = int(input().strip())

    Q = int(input().strip())

    special_integers_count = int(input().strip())

    special_integers = []

    for _ in range(special_integers_count):
        special_integers_item = int(input().strip())
        special_integers.append(special_integers_item)

    result = removeIntegers(N, P, Q, special_integers)

    fptr.write(str(result) + '\n')

    fptr.close()


Compiler Message
Time limit exceeded
Allowed time limit:10 secs
Your code did not execute in time. Please optimize your code. For more details on runtime environment, click the “Info” button
Your Output (stdout)
~ no response on stdout ~

def removeIntegers(N, P, Q, special_integers):
    mod = 10**9 + 7
    total_integers = 1 << N  
    memo = {}
    special_integers_set = set(special_integers)

    def find_min_cost(start, end):
        if (start, end) in memo:
            return memo[(start, end)]
        
        if start == end:
            if start in special_integers_set:
                return P
            else:
                return Q
        
        seg_len = end - start + 1
        special_count = sum(1 for i in range(start, end + 1) if i in special_integers_set)
        cost_with_specials = seg_len * special_count * P if special_count else Q

        if seg_len % 2 == 0:
            mid = (start + end) // 2
            cost_split = (find_min_cost(start, mid) + find_min_cost(mid + 1, end)) % mod
            cost = min(cost_with_specials, cost_split)
        else:
            cost = cost_with_specials

        memo[(start, end)] = cost % mod
        return cost % mod

    return find_min_cost(1, total_integers)

#!/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'removeIntegers' function below.
#
# The function is expected to return an INTEGER.
# The function accepts following parameters:
#  1. INTEGER N
#  2. INTEGER P
#  3. INTEGER Q
#  4. INTEGER_ARRAY special_integers
#
def removeIntegers(N, P, Q, special_integers):
    mod = 10**9 + 7
    total_integers = 1 << N  
    memo = {}
    special_integers_set = set(special_integers)

    def find_min_cost(start, end):
        if (start, end) in memo:
            return memo[(start, end)]
        
        if start == end:
            if start in special_integers_set:
                return P
            else:
                return Q
        
        seg_len = end - start + 1
        special_count = sum(1 for i in range(start, end + 1) if i in special_integers_set)
        cost_with_specials = seg_len * special_count * P if special_count else Q

        if seg_len % 2 == 0:
            mid = (start + end) // 2
            cost_split = (find_min_cost(start, mid) + find_min_cost(mid + 1, end)) % mod
            cost = min(cost_with_specials, cost_split)
        else:
            cost = cost_with_specials

        memo[(start, end)] = cost % mod
        return cost % mod

    return find_min_cost(1, total_integers)

def removeIntegers1(N, P, Q, special_integers):
    mod = 10**9 + 7
    total_integers = 1 << N
    memo={}

    def count_specials_in_seg(start,end):
        cnt = 0
        for special in special_integers:
            if start <= special <= end:
                cnt += 1
        return cnt
        
    def find_min_cost(start,end):
        if (start, end) in memo:
            return [(start,end)]
            
        if start == end:
            if start in special_integers:
                return P
            else:
                return Q
                
        special_cnt = count_specials_in_seg(start,end)
        
        if special_cnt==0:
            return Q
            
        seg_len = end - start + 1
        cost_with_specials = seg_len * special_cnt * P
        
        if seg_len % 2==0:
            mid = (start+end)//2
            cost_split = (find_min_cost(start,mid)+find_min_cost(mid+1,end)) % mod
            min_cost = min(cost_with_specials, cost_split)
        else:
            min_cost = cost_with_specials
        
        memo[(start,end)] = min_cost%mod
        return min_cost%mod
    return find_min_cost(1, total_integers)
        

    
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    N = int(input().strip())

    P = int(input().strip())

    Q = int(input().strip())

    special_integers_count = int(input().strip())

    special_integers = []

    for _ in range(special_integers_count):
        special_integers_item = int(input().strip())
        special_integers.append(special_integers_item)

    result = removeIntegers(N, P, Q, special_integers)

    fptr.write(str(result) + '\n')

    fptr.close()

Compiler Message
Time limit exceeded
Allowed time limit:10 secs
Your code did not execute in time. Please optimize your code. For more details on runtime environment, click the “Info” button
Your Output (stdout)
~ no response on stdout ~
