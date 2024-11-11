import numpy as np

def dcg_at_k(relevance_scores, k):
    return np.sum([relevance_scores[i] / np.log2(i + 2) for i in range(k)])

def idcg_at_k(relevance_scores, k):
    sorted_relevance_scores = sorted(relevance_scores, reverse=True)
    return dcg_at_k(sorted_relevance_scores, k)

def ndcg_at_k(relevance_scores, k):
    dcg = dcg_at_k(relevance_scores, k)
    idcg = idcg_at_k(relevance_scores, k)
    return dcg / idcg if idcg != 0 else 0

# Example usage
relevance_scores = [1,0,0,0,0,0,0,3,0,0,0,0,3,0,0,2,3,0,0,3]
k = 20

ndcg = ndcg_at_k(relevance_scores, k)
print(f"NDCG@{k}: {ndcg}")