
#include <iostream>
#include <string>
#include <unordered_map>
#include <queue>
#include <deque>
using namespace std;

string solution(string &S) {
    unordered_map<int, int> cnt;
    priority_queue<int> pq;
    string res;

    for (char ch : S) {
        int d = ch - '0';
        cnt[d]++;
        if (cnt[d] == 1 && d != 0) { 
            pq.push(d);
        }
    }

    if (cnt.size() == 1 && cnt.begin()->first == 0) {
        return "0";
    }

    deque<char> fh, bh;
    char md = 0; 

    while (!pq.empty()) {
        int d = pq.top();
        pq.pop();

        if (cnt[d] % 2 != 0 && md == 0) {
            md = '0' + d;
            cnt[d]--;
        }

        string part(cnt[d] / 2, '0' + d);
        fh.insert(fh.end(), part.begin(), part.end());
        bh.insert(bh.begin(), part.begin(), part.end());
    }

    if (cnt[0] > 0 && !fh.empty() && !bh.empty()) { 
        string zeros(cnt[0], '0');
        fh.insert(fh.end(), zeros.begin(), zeros.end());
        bh.insert(bh.begin(), zeros.begin(), zeros.end());
    }

    res = string(fh.begin(), fh.end()) + (md ? string(1, md) : "") + string(bh.begin(), bh.end());
    return res;
}

int main() {
    string test1 = "39878";
    cout << solution(test1) << endl; // Expected "898"

    string test2 = "00900";
    cout << solution(test2) << endl; // Expected "9"

    string test3 = "0000";
    cout << solution(test3) << endl; // Expected "0"

    string test4 = "54321";
    cout << solution(test4) << endl; // Expected "5"

    return 0;
}
