#include <vector>
#include <algorithm>
#include <limits>
#include <queue>
#include <limits>
using namespace std;

const int MOD = 1e9;

int solution(vector<int> &A, int C1, int C2) {
    sort(A.begin(), A.end());
    long long maxVal = A.back();
    long long minC = std::numeric_limits<long long>::max();
    
    for (long long tgt = maxVal; tgt <= maxVal + static_cast<long long>(A.size()); ++tgt) {
        long long c = 0;
        priority_queue<int, vector<int>, greater<int>> pq(A.begin(), A.end());

        while (!pq.empty()) {
            int minN = pq.top(); pq.pop();
            int secMinN = (pq.empty()) ? tgt : pq.top();

            if (minN >= tgt) break;
            
            if (pq.empty() || C2 >= 2 * C1 || secMinN == tgt) {
                c += (tgt - minN) * C1;
                if (!pq.empty()) pq.pop();
            } else {
                pq.pop();
                c += C2;
                if (minN + 1 < tgt) pq.push(minN + 1);
                if (secMinN + 1 < tgt) pq.push(secMinN + 1);
            }
        }

        minC = min(minC, c);
    }
    
    return static_cast<int>(minC % MOD);
}

#include <vector>
#include <algorithm>
using namespace std;

const int MOD = 1e9;

long long modOp(long long a, long long b, int op, long long mod) {
    if (op == 0) return (a + b) % mod;
    if (op == 1) return (a * b) % mod;
    return 0;
}

int solution(vector<int> &A, int C1, int C2) {
    sort(A.begin(), A.end());
    long long cost = 0;
    long long maxVal = A.back();

    if (C2 <= 2 * C1) {
        for (int i = 0; i < A.size(); ++i) {
            if (A[i] < maxVal) {
                cost = modOp(cost, C2, 0, MOD);
                A[i]++;
                if (i + 1 < A.size() && A[i + 1] < maxVal) {
                    A[i + 1]++;
                } else {
                    cost = modOp(cost, C1, 0, MOD);
                }
            }
        }
    } else {
        for (int val : A) {
            cost = modOp(cost, modOp(C1, maxVal - val, 1, MOD), 0, MOD);
        }
    }

    return static_cast<int>(cost);
}


