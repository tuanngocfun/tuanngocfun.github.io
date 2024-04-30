def min_cost_to_equalize(A, c1, c2):
    MOD = 10**9

    def total_cost_to_target(A, target, c1, c2):
        single_ops = 0
        double_ops = 0
        for num in A:
            diff = target - num
            double_ops += diff // 2
            single_ops += diff % 2
        cost = (double_ops * c2 + single_ops * c1) % MOD
        return cost

    maxA = max(A)
    min_cost = float('inf')

    for target in range(maxA, maxA + len(A) + 1):
        cost = total_cost_to_target(A, target, c1, c2)
        min_cost = min(min_cost, cost)

    return min_cost

# Example use:
A1 = [1, 4]
c1_1 = 15
c2_1 = 3
print(min_cost_to_equalize(A1, c1_1, c2_1))  # Output should be 45

A2 = [2, 11, 11, 11, 12]
c1_2 = 10
c2_2 = 4
print(min_cost_to_equalize(A2, c1_2, c2_2))  # Output should be 54
