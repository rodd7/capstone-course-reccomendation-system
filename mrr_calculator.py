import numpy as np

# Example: List of ranks for the 20 queries (use your own rank values)
ranks = [1,2,5,2,3,1,1,1,11,1]

# Function to calculate Top-k Precision
def top_k_precision(ranks, k):
    relevant_items = sum(1 for rank in ranks[:k] if rank <= k)
    return relevant_items / k

# Calculate Top 10 Precision and Top 20 Precision
top_10_precision = top_k_precision(ranks, 10)
top_20_precision = top_k_precision(ranks, 20)

# Calculate the Reciprocal Rank for each query
reciprocal_ranks = [1 / rank if rank != 0 else 0 for rank in ranks]

# Calculate Mean Reciprocal Rank (MRR)
mrr = sum(reciprocal_ranks) / 10

print(f"Top 10 Precision: {top_10_precision}")
print(f"Top 20 Precision: {top_20_precision}")
print(f"Mean Reciprocal Rank (MRR): {mrr}")
