Sure — here’s a **JavaScript interview coding questions list**, organized from beginner to advanced.

### 🟢 Beginner JavaScript Coding Questions

1. Reverse a string without using `reverse()`.
2. Check whether a string is a palindrome.
3. Find the factorial of a number.
4. Find the Fibonacci series up to `n` terms.
5. Check whether a number is prime.
6. Find the largest number in an array.
7. Find the smallest number in an array.
8. Find the sum of all elements in an array.
9. Count vowels in a string.
10. Count the frequency of each character in a string.
11. Remove duplicate elements from an array.
12. Find the second-largest number in an array.
13. Find even and odd numbers from an array.
14. Swap two numbers without using a third variable.
15. Check whether two strings are anagrams.
16. Find the number of occurrences of an element in an array.
17. Reverse an array without using `reverse()`.
18. Find missing numbers from an array.
19. Sort an array without using `sort()`.
20. Find common elements between two arrays.

### 🟡 Intermediate JavaScript Questions

21. Flatten a nested array.

```js
// Input
[1, [2, [3, 4]], 5]

// Output
[1, 2, 3, 4, 5]
```

22. Implement your own `map()` function.
23. Implement your own `filter()` function.
24. Implement your own `reduce()` function.
25. Implement your own `forEach()` function.
26. Implement a custom `find()` function.
27. Implement a custom `includes()` function.
28. Implement a custom `bind()` function.
29. Implement a custom `call()` function.
30. Implement a custom `apply()` function.
31. Deep clone an object.
32. Check whether two objects are deeply equal.
33. Convert an object into an array of key-value pairs.
34. Convert an array into an object.
35. Group objects by a property.
36. Remove duplicate objects from an array.
37. Find the first non-repeating character.
38. Find the longest word in a sentence.
39. Find the longest substring without repeating characters.
40. Find all pairs whose sum equals a given number.
41. Find the intersection of two arrays.
42. Find the union of two arrays.
43. Rotate an array by `k` positions.
44. Chunk an array into smaller arrays.
45. Implement a `unique()` function.

### 🟠 Functions, Closures & Async

46. Create a counter using closure.

```js
const counter = createCounter();

counter(); // 1
counter(); // 2
counter(); // 3
```

47. Implement function currying.

```js
sum(1)(2)(3) // 6
```

48. Implement partial application.
49. Implement memoization.
50. Implement a debounce function.
51. Implement a throttle function.
52. Implement `once()` — a function that executes only once.
53. Implement function composition.
54. Implement a pipe function.
55. Implement a retry mechanism for a Promise.
56. Implement `Promise.all()`.
57. Implement `Promise.race()`.
58. Implement `Promise.allSettled()`.
59. Implement `Promise.any()`.
60. Execute multiple async tasks with a concurrency limit.

### 🔴 Advanced JavaScript Coding Questions

61. Implement an **LRU Cache**.
62. Implement an **Event Emitter**.

```js
emitter.on("login", callback);
emitter.emit("login");
emitter.off("login", callback);
```

63. Implement a custom **Promise**.
64. Implement a **task scheduler**.
65. Implement a **Pub/Sub system**.
66. Implement a **rate limiter**.
67. Implement a **deep freeze** function.
68. Implement a **deep merge** function.
69. Implement object path access.

```js
get(obj, "user.profile.name");
```

70. Implement object path assignment.

```js
set(obj, "user.profile.name", "John");
```

71. Convert a nested object into a flat object.

```js
{
  user: {
    name: "John",
    address: {
      city: "Pune"
    }
  }
}

// {
//   "user.name": "John",
//   "user.address.city": "Pune"
// }
```

72. Convert a flat object back into a nested object.
73. Implement a virtual DOM diff algorithm.
74. Implement a simple template engine.
75. Implement an infinite-scroll data loader.
76. Implement an autocomplete/search with debounce.
77. Implement a pagination utility.
78. Implement a queue using two stacks.
79. Implement a stack using two queues.
80. Implement a priority queue.

### ⭐ Very Common JavaScript Interview Coding Questions

If you're preparing for interviews, prioritize these:

1. Reverse string
2. Palindrome
3. Fibonacci
4. Factorial
5. Prime number
6. Remove duplicates
7. Find second largest
8. Character frequency
9. Anagram
10. Missing number
11. Flatten array
12. Array/object manipulation
13. Deep clone
14. `map`, `filter`, `reduce` polyfills
15. `call`, `apply`, `bind` polyfills
16. Debounce
17. Throttle
18. Closure counter
19. Currying
20. Memoization
21. Promise implementation
22. `Promise.all`
23. Async concurrency
24. Event emitter
25. LRU cache

If you're targeting **JavaScript/React frontend interviews**, I can also give you a **100-question JavaScript coding sheet with questions + expected output + solutions**, arranged as **Easy → Medium → Hard**.
