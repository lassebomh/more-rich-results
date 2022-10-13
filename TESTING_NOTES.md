
# Reduce drag


# Accuracy of a query

1. pick a result from a result source
2. write a "complete query" that mocks what the user would write if they had one chance to find the result. n is the length of the query
3. make n queries where the query string is a substring of the complete query from 1 to n-1.
4. the accuracy of the query is measured by the sum of the ratio between score of the top result and the target result, divided by n

Get results for a full and exact match

a query with the intent of finding the 

