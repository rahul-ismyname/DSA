export interface RoadmapProblem {
  leetcode_number: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  module: "Beginner" | "Intermediate" | "Advanced";
}

export const DEFAULT_PROBLEMS: RoadmapProblem[] = [
  // ==================== BEGINNER MODULE ====================

  // Beginner: Arrays & Hashing (1-25)
  {
    leetcode_number: "1",
    title: "Two Sum",
    description: "Find two numbers in an array that add up to a specific target.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "217",
    title: "Contains Duplicate",
    description: "Check if any value appears at least twice in an integer array.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "121",
    title: "Best Time to Buy and Sell Stock",
    description: "Find the maximum profit you can achieve from buying and selling a stock once.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "238",
    title: "Product of Array Except Self",
    description: "Construct an array where each index is the product of all other elements of the array without using division.",
    difficulty: "Medium",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "53",
    title: "Maximum Subarray",
    description: "Find the contiguous subarray within an array which has the largest sum.",
    difficulty: "Medium",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "26",
    title: "Remove Duplicates from Sorted Array",
    description: "Remove duplicates in-place such that each unique element appears only once.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "27",
    title: "Remove Element",
    description: "Remove all occurrences of a specified value in-place from an array.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "35",
    title: "Search Insert Position",
    description: "Find the index where a target value would be inserted in a sorted array.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "66",
    title: "Plus One",
    description: "Increment a large integer represented as an array of digits by one.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "88",
    title: "Merge Sorted Array",
    description: "Merge two sorted arrays into one sorted array in-place.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "118",
    title: "Pascal's Triangle",
    description: "Generate the first numRows of Pascal's triangle.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "119",
    title: "Pascal's Triangle II",
    description: "Return the 0-indexed row of Pascal's triangle specified by index.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "136",
    title: "Single Number",
    description: "Find the element in an array that appears only once where others appear twice.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "169",
    title: "Majority Element",
    description: "Find the element in an array that appears more than half of the times.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "228",
    title: "Summary Ranges",
    description: "Return the smallest list of sorted ranges that cover all the numbers in the array.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "268",
    title: "Missing Number",
    description: "Find the only missing number in the range from 0 to n from a given array.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "349",
    title: "Intersection of Two Arrays",
    description: "Return an array of unique intersection values from two input arrays.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "350",
    title: "Intersection of Two Arrays II",
    description: "Return an array containing elements appearing in both arrays, including duplicates.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "414",
    title: "Third Maximum Number",
    description: "Return the third distinct maximum number in an integer array.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "448",
    title: "Find All Numbers Disappeared in an Array",
    description: "Find all integers in range [1, n] that do not appear in an array.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "485",
    title: "Max Consecutive Ones",
    description: "Find the maximum number of consecutive 1s in a binary array.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "506",
    title: "Relative Ranks",
    description: "Determine individual rank/awards for players based on their scores.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "561",
    title: "Array Partition",
    description: "Partition 2n integers into n pairs maxing the sum of minimums.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "605",
    title: "Can Place Flowers",
    description: "Determine if extra flowers can be planted without violating adjacent rules.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },
  {
    leetcode_number: "643",
    title: "Maximum Average Subarray I",
    description: "Find a contiguous subarray of size k with the maximum average value.",
    difficulty: "Easy",
    category: "Arrays",
    module: "Beginner"
  },

  // Beginner: Strings (26-50)
  {
    leetcode_number: "242",
    title: "Valid Anagram",
    description: "Determine if two strings are anagrams of each other.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "125",
    title: "Valid Palindrome",
    description: "Determine if a string is a palindrome, considering only alphanumeric characters.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "14",
    title: "Longest Common Prefix",
    description: "Find the longest common prefix string amongst an array of strings.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "20",
    title: "Valid Parentheses",
    description: "Determine if the input string has correctly nested brackets.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "28",
    title: "Find index of First Occurrence",
    description: "Find the first occurrence index of a needle string within a haystack.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "58",
    title: "Length of Last Word",
    description: "Return the length of the last word in a space-separated string.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "344",
    title: "Reverse String",
    description: "Reverse a character array in-place.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "383",
    title: "Ransom Note",
    description: "Determine if a ransom note string can be built using characters from a magazine.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "387",
    title: "First Unique Character in a String",
    description: "Find the index of the first non-repeating character in a string.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "389",
    title: "Find the Difference",
    description: "Identify the single character added to a modified target string.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "409",
    title: "Longest Palindrome",
    description: "Determine the length of the longest palindrome built with given characters.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "412",
    title: "Fizz Buzz",
    description: "Return a list of strings representing numbers from 1 to n with standard substitution rules.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "415",
    title: "Add Strings",
    description: "Perform large integer summation of two numeric strings mathematically.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "434",
    title: "Number of Segments in a String",
    description: "Count the number of non-space segments or words in a string.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "459",
    title: "Repeated Substring Pattern",
    description: "Check if a string can be constructed by repeating a substring.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "520",
    title: "Detect Capital",
    description: "Evaluate if capitals are used historically correctly (e.g., USA, Google, leetcode).",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "541",
    title: "Reverse String II",
    description: "Reverse first k characters for every 2k block of a string.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "551",
    title: "Student Attendance Record I",
    description: "Evaluate if attendance shows less than 2 single absent and 3 consecutive late days.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "557",
    title: "Reverse Words in a String III",
    description: "Reverse the individual character order of each word in a phrase.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "657",
    title: "Robot Return to Origin",
    description: "Check if a series of moves returns a 2D moving robot to (0,0).",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "680",
    title: "Valid Palindrome II",
    description: "Check if a string can form a palindrome by removing at most one character.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "709",
    title: "To Lower Case",
    description: "Implement a low-level routine to map characters to lower case.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "796",
    title: "Rotate String",
    description: "Check if string A can be shifted cyclically to match string B.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "824",
    title: "Goat Latin",
    description: "Convert sentences using rules defined for Pig/Goat Latin modifications.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },
  {
    leetcode_number: "844",
    title: "Backspace String Compare",
    description: "Determine if two strings containing '#' backspaces resolve to matching results.",
    difficulty: "Easy",
    category: "Strings",
    module: "Beginner"
  },

  // Beginner: Two Pointers (51-75)
  {
    leetcode_number: "283",
    title: "Move Zeroes",
    description: "Move all zero elements to the end of the array while maintaining order.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "392",
    title: "Is Subsequence",
    description: "Check if one string is a subsequent partition of another.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "977",
    title: "Squares of a Sorted Array",
    description: "Sort squared numbers in a sorted array in linear O(N) complexity.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "905",
    title: "Sort Array By Parity",
    description: "Group even values first followed by odd values in-place.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "922",
    title: "Sort Array By Parity II",
    description: "Interleave even and odd elements at their corresponding parity indices.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "2108",
    title: "First Palindromic String in Array",
    description: "Return the first palindrome string found in a list of words.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "345",
    title: "Reverse Vowels of a String",
    description: "Reverse only the vowels present in a character string using pointers.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "2441",
    title: "Largest Positive Integer with Negative",
    description: "Find the maximum target integer k that exists as both positive and negative.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "2460",
    title: "Apply Operations to an Array",
    description: "Perform calculations on consecutive values and shift zero records to the end.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "2540",
    title: "Minimum Common Value",
    description: "Find the smallest value that appears in two separate sorted arrays.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "2367",
    title: "Number of Arithmetic Triplets",
    description: "Count total unique triples (i, j, k) separated by exact value difference diff.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1332",
    title: "Remove Palindromic Subsequences",
    description: "Find the minimum deletions of subsequence palindromes to empty a binary string of a/b.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1961",
    title: "Check If String Is a Prefix of Array",
    description: "Determine if string can be formed exactly by concatenating words from prefix array.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "2000",
    title: "Reverse Prefix of Word",
    description: "Find character index occurrence and reverse string segment up to that character.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1455",
    title: "Check If Word Is Prefix of Any Sentence Word",
    description: "Find the index placement of the word matching prefix string parameter.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1346",
    title: "Check If N and Its Double Exist",
    description: "Evaluate if there exist indices i/j where value at i double matches value at j.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1768",
    title: "Merge Strings Alternately",
    description: "Merge two strings by adding characters alternately, starting with the first.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1089",
    title: "Duplicate Zeros",
    description: "Duplicate all occurences of zero element value in-place shifting subsequent data.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "2200",
    title: "Find All K-Distant Indices in Array",
    description: "List indices close within distance threshold offset k of a target key element.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1200",
    title: "Minimum Absolute Difference",
    description: "Find all pairs with difference equivalent to minimum difference in sorted order.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1464",
    title: "Maximum Product of Two Elements",
    description: "Find two elements in array maximizing formula expression (valA-1)*(valB-1).",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1475",
    title: "Final Prices with Special Discount",
    description: "Compute array values applying price deduction discounts based on future smaller keys.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1385",
    title: "Find the Distance Value Between Two Arrays",
    description: "Count elements failing target proximity differences relative to another set.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1619",
    title: "Mean of Array After Removing Some Elements",
    description: "Compute mathematical mean ignoring first/last 5% outlier records.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },
  {
    leetcode_number: "1662",
    title: "Check If Two String Arrays Are Equivalent",
    description: "Check if concatenation outputs represent matching character strings.",
    difficulty: "Easy",
    category: "Two Pointers",
    module: "Beginner"
  },

  // Beginner: Sliding Window (76-100)
  {
    leetcode_number: "1984",
    title: "Minimum Difference Between Highest and Lowest of K Scores",
    description: "Select k scores minimizing difference between highest and lowest.",
    difficulty: "Easy",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "2269",
    title: "Find the K-Beauty of a Number",
    description: "Count contiguous substrings representing string integers that divide original parameter value.",
    difficulty: "Easy",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "2379",
    title: "Minimum Recolors to Get K Consecutive Black Blocks",
    description: "Find window of size k minimizing modifications from white to black coloring.",
    difficulty: "Easy",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1876",
    title: "Substrings of Size Three with Distinct Characters",
    description: "Count substrings of size exactly three composed containing no duplicate values.",
    difficulty: "Easy",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "2099",
    title: "Find Subsequence of Length K with Largest Sum",
    description: "Identify subsets or subsequences maximizing math total summing index values.",
    difficulty: "Easy",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1652",
    title: "Defuse the Bomb",
    description: "Decipher circular values by computing summing window offsets depending on code sign parameter k.",
    difficulty: "Easy",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "219",
    title: "Contains Duplicate II",
    description: "Evaluate if there exist indices within maximum spatial distance index limit difference k.",
    difficulty: "Easy",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1176",
    title: "Diet Plan Performance",
    description: "Track performance points over sequence intervals evaluating calories standard thresholds.",
    difficulty: "Easy",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1151",
    title: "Minimum Swaps to Group All 1's Together",
    description: "Determine swaps threshold using fixed sliding window matching total counts.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1004",
    title: "Max Consecutive Ones III",
    description: "Compute maximal length series allowing up to k zero modifications in window.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "424",
    title: "Longest Repeating Character Replacement",
    description: "Replace at most k characters to maximize repeating character window length.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "567",
    title: "Permutation in String",
    description: "Determine if substring matching target text anagram permutes within larger parameter.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "438",
    title: "Find All Anagrams in a String",
    description: "Identify index placements where target substring matches anagram form factor.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1423",
    title: "Maximum Points You Can Obtain from Cards",
    description: "Select k cards from outer edges to maximize standard cumulative values.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "209",
    title: "Minimum Size Subarray Sum",
    description: "Find minimal contiguous length with sum matching or exceeding specific target parameter.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "713",
    title: "Subarray Product Less Than K",
    description: "Count consecutive arrays whose cumulative values product remains strictly below threshold val.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "904",
    title: "Fruit Into Baskets",
    description: "Find the maximum adjacent elements composed of at most two distinct types.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "930",
    title: "Binary Subarrays With Sum",
    description: "Count contiguous regions summing to specific value target within a simple binary array.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1248",
    title: "Count Number of Nice Subarrays",
    description: "Identify regions containing exactly k odd counts in sequence integers.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1358",
    title: "Number of Substrings Containing All Three Characters",
    description: "Count regions that contain at least one occurrence of letters 'a', 'b', and 'c'.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1234",
    title: "Replace the Substring for Balanced String",
    description: "Find the minimum size substring swap to acquire balanced frequency of Q/W/E/R.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1456",
    title: "Maximum Number of Vowels in a Substring",
    description: "Find subregion of exact width k containing highest vowel character count.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1493",
    title: "Longest Subarray of 1's After Deleting One Element",
    description: "Determine max length binary contiguous string after removing a single selected slot.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1695",
    title: "Maximum Erasure Value",
    description: "Secure dynamic window maximizing unique number sums without repeating any element.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },
  {
    leetcode_number: "1838",
    title: "Frequency of the Most Frequent Element",
    description: "Perform at most k increments to maximize identical occurrences matching standard targets.",
    difficulty: "Medium",
    category: "Sliding Window",
    module: "Beginner"
  },


  // ==================== INTERMEDIATE MODULE ====================

  // Intermediate: Stacks & Queues (101-125)
  {
    leetcode_number: "155",
    title: "Min Stack",
    description: "Design a stack supporting push, pop, top, and retrieving the minimum element in constant O(1) time.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "150",
    title: "Evaluate Reverse Polish Notation",
    description: "Evaluate the value of an arithmetic expression in Reverse Polish Notation.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "224",
    title: "Basic Calculator",
    description: "Implement a basic calculator to evaluate a simple mathematical string expression.",
    difficulty: "Hard",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "227",
    title: "Basic Calculator II",
    description: "Evaluate mathematical expression containing basic operators (add, subtract, multiply, divide).",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "232",
    title: "Implement Queue using Stacks",
    description: "Implement a first-in-first-out queue using only standard stack primitives.",
    difficulty: "Easy",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "225",
    title: "Implement Stack using Queues",
    description: "Implement a last-in-first-out stack using only standard queue operations.",
    difficulty: "Easy",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "316",
    title: "Remove Duplicate Letters",
    description: "Remove duplicate letters to acquire smallest lexicographical output preserving original order.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "394",
    title: "Decode String",
    description: "Decode a string formatted as k[encoded_string] into duplicated sequences.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "402",
    title: "Remove K Digits",
    description: "Remove k digits to construct the smallest possible numeric string representation.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "456",
    title: "132 Pattern",
    description: "Identify if there exists indices i < j < k such that val_i < val_k < val_j.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "496",
    title: "Next Greater Element I",
    description: "Find the next greater element in a sequence using monotonic stack techniques.",
    difficulty: "Easy",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "503",
    title: "Next Greater Element II",
    description: "Find the next greater element in a circular subarray using monotonic stack indices.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "739",
    title: "Daily Temperatures",
    description: "Find days remaining to wait for warmer temperatures using a monotonic stack pattern.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "735",
    title: "Asteroid Collision",
    description: "Simulate linear collision effects using stack push and pop comparisons.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "853",
    title: "Car Fleet",
    description: "Determine total distinct car fleets arriving at a destination bottleneck.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "901",
    title: "Online Stock Span",
    description: "Retrieve consecutive span of previous days when stock was less than current day's price.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "907",
    title: "Sum of Subarray Minimums",
    description: "Compute sum of minimum values in all contiguous subsets using monotonic stack ranges.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "946",
    title: "Validate Stack Sequences",
    description: "Evaluate if pushing and popping data matches valid sequence progression.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "1019",
    title: "Next Greater Node In Linked List",
    description: "Compute the next larger node value for every single element in a list.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "1047",
    title: "Remove All Adjacent Duplicates In String",
    description: "Recursively remove adjacent identical letter elements back-to-back using a stack.",
    difficulty: "Easy",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "1209",
    title: "Remove All Adjacent Duplicates in String II",
    description: "Remove duplicate character series when they form sequences of exactly length k.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "1249",
    title: "Minimum Remove to Make Valid Parentheses",
    description: "Remove minimum parentheses symbols to generate valid balanced expressions.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "1441",
    title: "Build an Array With Stack Operations",
    description: "Produce exact stack push/pop operation sequence matching list format parameters.",
    difficulty: "Easy",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "1544",
    title: "Make The String Great",
    description: "Remove adjacent matching characters differing only in case casing (e.g. 'aA').",
    difficulty: "Easy",
    category: "Stacks & Queues",
    module: "Intermediate"
  },
  {
    leetcode_number: "1673",
    title: "Find the Most Competitive Subsequence",
    description: "Retrieve smallest lexicographical subsequence of target length size k.",
    difficulty: "Medium",
    category: "Stacks & Queues",
    module: "Intermediate"
  },

  // Intermediate: Linked Lists (126-150)
  {
    leetcode_number: "206",
    title: "Reverse Linked List",
    description: "Reverse a singly linked list in-place.",
    difficulty: "Easy",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "21",
    title: "Merge Two Sorted Lists",
    description: "Splice two sorted lists together in order.",
    difficulty: "Easy",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "141",
    title: "Linked List Cycle",
    description: "Check if a linked list contains a loop using fast and slow pointers.",
    difficulty: "Easy",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "142",
    title: "Linked List Cycle II",
    description: "Locate the precise node where a cycle start occurs inside the list.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "19",
    title: "Remove Nth Node From End of List",
    description: "Delete the N-th node from the tail end of a linked list.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "2",
    title: "Add Two Numbers",
    description: "Add two numbers represented as linked lists, stored in reverse order.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "143",
    title: "Reorder List",
    description: "Reorder a list to interleave start and end node sequences.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "24",
    title: "Swap Nodes in Pairs",
    description: "Swap every consecutive pair of adjacent nodes in-place.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "61",
    title: "Rotate List",
    description: "Rotate list components rightwards cyclically by offset parameter k.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "82",
    title: "Remove Duplicates from Sorted List II",
    description: "Delete all node occurrences which have duplicate record numbers.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "83",
    title: "Remove Duplicates from Sorted List",
    description: "Remove duplicate values from a sorted list keeping unique item values.",
    difficulty: "Easy",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "86",
    title: "Partition List",
    description: "Group elements smaller than x preserving original logical relative order.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "92",
    title: "Reverse Linked List II",
    description: "Reverse subset nodes from indices bounds left to right in single pass.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "138",
    title: "Copy List with Random Pointer",
    description: "Create a deep copy of a list with arbitrary random pointer configurations.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "147",
    title: "Insertion Sort List",
    description: "Sort a linked list of records implementing standard insertion sort algorithm.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "148",
    title: "Sort List",
    description: "Sort a linked list in O(N log N) using merge sort routines.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "160",
    title: "Intersection of Two Linked Lists",
    description: "Find the node where two distinct linked lists intersect visually.",
    difficulty: "Easy",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "203",
    title: "Remove Linked List Elements",
    description: "Remove all nodes containing a target val from linked list.",
    difficulty: "Easy",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "234",
    title: "Palindrome Linked List",
    description: "Evaluate if list elements structure forms a palindrome sequence.",
    difficulty: "Easy",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "328",
    title: "Odd Even Linked List",
    description: "Group odd index location nodes first followed by all even nodes together.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "445",
    title: "Add Two Numbers II",
    description: "Perform addition of list inputs representing formatted non-reversed integers.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "707",
    title: "Design Linked List",
    description: "Design and implement custom singly or doubly linked list libraries.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "725",
    title: "Split Linked List in Parts",
    description: "Partition a list into k consecutive sections balancing matching length splits.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "876",
    title: "Middle of the Linked List",
    description: "Return middle node of a list, preferring the second on even sizes.",
    difficulty: "Easy",
    category: "Linked Lists",
    module: "Intermediate"
  },
  {
    leetcode_number: "1171",
    title: "Remove Zero Sum Consecutive Nodes",
    description: "Remove adjacent node sequence groups which total sum equates zero.",
    difficulty: "Medium",
    category: "Linked Lists",
    module: "Intermediate"
  },

  // Intermediate: Binary Search (151-175)
  {
    leetcode_number: "704",
    title: "Binary Search",
    description: "Search a sorted array with logarithmic O(log N) time complexity.",
    difficulty: "Easy",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "74",
    title: "Search a 2D Matrix",
    description: "Search target number inside a 2D matrix possessing sorted properties.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "875",
    title: "Koko Eating Bananas",
    description: "Find the slowest eating speed k required to consume banana piles on time.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "153",
    title: "Find Minimum in Rotated Sorted Array",
    description: "Locate the minimum element from a sorted array subject to rotation offsets.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "33",
    title: "Search in Rotated Sorted Array",
    description: "Find index positions in dynamic arrays rotated previous sorted layout states.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "34",
    title: "Find First and Last Position",
    description: "Locate bounds ranges of an item inside a sorted array of duplicates.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "162",
    title: "Find Peak Element",
    description: "Locate any local peak element value that is strictly greater than adjacent neighbors.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "35",
    title: "Search Insert Position",
    description: "Return sorted index allocation where a number must be inserted.",
    difficulty: "Easy",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "69",
    title: "Sqrt(x)",
    description: "Determine the rounded integer square root value without using library features.",
    difficulty: "Easy",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "278",
    title: "First Bad Version",
    description: "Utilize API queries seeking earliest bad code update revision efficiently.",
    difficulty: "Easy",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "367",
    title: "Valid Perfect Square",
    description: "Enforce arithmetic logic testing integers to establish perfect square status.",
    difficulty: "Easy",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "441",
    title: "Arranging Coins",
    description: "Find the largest staircase row count reachable using k discrete coins.",
    difficulty: "Easy",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "540",
    title: "Single Element in a Sorted Array",
    description: "Locate unique single element within paired duplicate sequence sets O(log N).",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "240",
    title: "Search a 2D Matrix II",
    description: "Search target inside row/column-wise sorted grids.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "287",
    title: "Find the Duplicate Number",
    description: "Locate repeating values using binary search ranges or pointer mechanics.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "436",
    title: "Find Right Interval",
    description: "Establish mapping pointers linking interval bounds sequentially with binary search.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "1011",
    title: "Capacity To Ship Packages Within D Days",
    description: "Model logistics and minimum ship capacity utilizing binary search over answer space.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "1283",
    title: "Find Smallest Divisor Given Threshold",
    description: "Resolve matching divisor values satisfying threshold checks based on binary ranges.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "1482",
    title: "Minimum Days to Make m Bouquets",
    description: "Search minimum bloom threshold day requirements via binary search algorithm.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "1539",
    title: "Kth Missing Positive Number",
    description: "Find chronological missing values from sequence range mappings.",
    difficulty: "Easy",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "1552",
    title: "Magnetic Force Between Two Balls",
    description: "Distribute elements inside linear allocations to maximize minimum relative distances.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "1802",
    title: "Maximum Value at Given Index",
    description: "Generate mathematical heights optimizing constraints via binary search index limits.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "1894",
    title: "Find Student that will Replace Chalk",
    description: "Reduce summation cycles efficiently using modulo arithmetic over chalk arrays.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "2089",
    title: "Find Target Indices After Sorting",
    description: "Retrieve sorted placements indices pointing toward math targets.",
    difficulty: "Easy",
    category: "Binary Search",
    module: "Intermediate"
  },
  {
    leetcode_number: "2187",
    title: "Minimum Time to Complete Trips",
    description: "Evaluate matching trip values over linear time series via binary boundary limits.",
    difficulty: "Medium",
    category: "Binary Search",
    module: "Intermediate"
  },

  // Intermediate: Trees & Hash Maps (176-200)
  {
    leetcode_number: "226",
    title: "Invert Binary Tree",
    description: "Flip a binary tree left-to-right recursively.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "104",
    title: "Maximum Depth of Binary Tree",
    description: "Determine the maximum distance from root to leaf node.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "543",
    title: "Diameter of Binary Tree",
    description: "Find the longest path between any two leaf nodes in a tree.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "110",
    title: "Balanced Binary Tree",
    description: "Determine if left and right heights differ by at most one on all nodes.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "100",
    title: "Same Tree",
    description: "Evaluate if two binary trees are structurally identical.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "101",
    title: "Symmetric Tree",
    description: "Check if a tree is a mirrored symmetric representation of itself.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "572",
    title: "Subtree of Another Tree",
    description: "Verify if a tree contains an identical sub-element shape model.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "235",
    title: "Lowest Common Ancestor of a BST",
    description: "Find the closest common ancestor node in a binary search tree structure.",
    difficulty: "Medium",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "102",
    title: "Binary Tree Level Order Traversal",
    description: "Traverse tree nodes level-by-level (BFS algorithm).",
    difficulty: "Medium",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "199",
    title: "Binary Tree Right Side View",
    description: "Return elements visible looking at a tree from right side projection.",
    difficulty: "Medium",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "98",
    title: "Validate Binary Search Tree",
    description: "Verify if trees satisfy binary search constraints on values ranges.",
    difficulty: "Medium",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "230",
    title: "Kth Smallest Element in a BST",
    description: "Determine kth smallest value leveraging in-order traversal steps.",
    difficulty: "Medium",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "105",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    description: "Rebuild unique tree mappings given sequential traversals arrays.",
    difficulty: "Medium",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "144",
    title: "Binary Tree Preorder Traversal",
    description: "Traverse elements in pre-order layout order (Root, Left, Right).",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "145",
    title: "Binary Tree Postorder Traversal",
    description: "Traverse elements in post-order layout (Left, Right, Root).",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "94",
    title: "Binary Tree Inorder Traversal",
    description: "Traverse elements in sorted BST order (Left, Root, Right).",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "111",
    title: "Minimum Depth of Binary Tree",
    description: "Locate closest path distance from tree root node down to leaf structure.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "112",
    title: "Path Sum",
    description: "Evaluate if there exists a root-to-leaf path totaling exactly target sum.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "113",
    title: "Path Sum II",
    description: "Collect all root-to-leaf paths that equal parameter sum target.",
    difficulty: "Medium",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "124",
    title: "Binary Tree Maximum Path Sum",
    description: "Find the maximum sum path crossing any arbitrary nodes in a tree.",
    difficulty: "Hard",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "108",
    title: "Convert Sorted Array to Binary Search Tree",
    description: "Build height-balanced BST from sorted data input arrays.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "173",
    title: "Binary Search Tree Iterator",
    description: "Design standard iterators over trees displaying sorted output values.",
    difficulty: "Medium",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "222",
    title: "Count Complete Tree Nodes",
    description: "Compute node counts of complete structures in logarithmic O(log N)^2 time.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "257",
    title: "Binary Tree Paths",
    description: "Return leaf paths formatting string connections mapping tree flows.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "617",
    title: "Merge Two Binary Trees",
    description: "Combine nodes from double trees building unified node elements.",
    difficulty: "Easy",
    category: "Trees",
    module: "Intermediate"
  },


  // ==================== ADVANCED MODULE ====================

  // Advanced: Graphs & BFS/DFS (201-225)
  {
    leetcode_number: "200",
    title: "Number of Islands",
    description: "Count distinct islands of 1s in a grid using BFS/DFS algorithms.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "133",
    title: "Clone Graph",
    description: "Create a complete deep copy clone of an undirected connected graph.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "695",
    title: "Max Area of Island",
    description: "Determine the maximum sizes of island land cells from grid patterns.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "417",
    title: "Pacific Atlantic Water Flow",
    description: "Find grid locations water flows towards both oceans.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "130",
    title: "Surrounded Regions",
    description: "Capture bordered 'O' region grids resetting trapped values.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "994",
    title: "Rotting Oranges",
    description: "Model rot contagion timings utilizing grid BFS traversals.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "207",
    title: "Course Schedule",
    description: "Identify valid linear topological sequences checking cyclic paths.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "210",
    title: "Course Schedule II",
    description: "Return exact ordering schedule for courses given prerequisite dependencies.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "127",
    title: "Word Ladder",
    description: "Find shortest modification steps linking strings via BFS layers.",
    difficulty: "Hard",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "323",
    title: "Connected Components in Undirected Graph",
    description: "Find isolated networking boundaries counts inside node collections.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "261",
    title: "Graph Valid Tree",
    description: "Verify if graphs constitute isolated cycle-free networks.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "787",
    title: "Cheapest Flights Within K Stops",
    description: "Seek cheapest flights using Dijkstra or BFS boundary limitations.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "743",
    title: "Network Delay Time",
    description: "Measure signal distribution durations traversing systems via Dijkstra routing.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "1584",
    title: "Min Cost to Connect All Points",
    description: "Construct spanning trees minimizing weight thresholds (Prim/Kruskal).",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "1466",
    title: "Reorder Routes to Lead to City Zero",
    description: "Flip edge targets to ensure networking nodes connect back path roots.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "1971",
    title: "Find if Path Exists in Graph",
    description: "Determine paths existence connecting nodes parameters.",
    difficulty: "Easy",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "841",
    title: "Keys and Rooms",
    description: "Evaluate if unlocking consecutive items permits viewing all target states.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "1091",
    title: "Shortest Path in Binary Matrix",
    description: "Compute shortest distances crossing grid coordinates sequentially.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "1162",
    title: "As Far from Land as Possible",
    description: "Determine distances maximizing water zones boundary spacing metrics.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "1306",
    title: "Jump Game III",
    description: "Solve jump routes validating reaches target value zero.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "1319",
    title: "Number of Operations to Make Network Connected",
    description: "Redistribute networking lines merging individual disconnected islands.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "1361",
    title: "Validate Binary Tree Nodes",
    description: "Test node hierarchies confirming single tree layouts validity.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "1462",
    title: "Course Schedule IV",
    description: "Solve multiple queries establishing prerequisite courses relations.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "1615",
    title: "Maximal Network Rank",
    description: "Determine adjacent networking node pair that maximizes rank connections count.",
    difficulty: "Medium",
    category: "Graphs",
    module: "Advanced"
  },
  {
    leetcode_number: "1627",
    title: "Graph Connectivity With Threshold",
    description: "Connect values when common divisors exceed threshold constraints (Union-Find).",
    difficulty: "Hard",
    category: "Graphs",
    module: "Advanced"
  },

  // Advanced: Backtracking (226-250)
  {
    leetcode_number: "78",
    title: "Subsets",
    description: "Generate the complete power set of unique numerical elements.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "90",
    title: "Subsets II",
    description: "Generate potential subsets managing duplicated values elegantly.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "39",
    title: "Combination Sum",
    description: "Collect candidates whose elements sum matching target with repetition allowed.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "40",
    title: "Combination Sum II",
    description: "Collect sum combinations where candidates list contains duplicates used once.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "46",
    title: "Permutations",
    description: "Generate all distinct permutations from list elements parameter.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "47",
    title: "Permutations II",
    description: "Generate unique permutations sequence configurations from duplicated arrays.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "77",
    title: "Combinations",
    description: "List out subsets sizing k chosen from sequence up to input n.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "17",
    title: "Letter Combinations of a Phone Number",
    description: "Form combinations matching digits on keyboard map.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "51",
    title: "N-Queens",
    description: "Align n chess queens safe from threats on 2D board setups.",
    difficulty: "Hard",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "52",
    title: "N-Queens II",
    description: "Compute total layouts count solving n-queens positioning parameters.",
    difficulty: "Hard",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "22",
    title: "Generate Parentheses",
    description: "Form configurations containing correctly nested open/close parentheses.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "79",
    title: "Word Search",
    description: "Verify if character string weaves adjacent grid coordinate sequences.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "93",
    title: "Restore IP Addresses",
    description: "Construct valid IP address groups partitioning numbers string parameters.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "131",
    title: "Palindrome Partitioning",
    description: "Segment strings where individual parts form palindromic substrings.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "216",
    title: "Combination Sum III",
    description: "Find combinatorics matching summing counts k summing values to target digits.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "301",
    title: "Remove Invalid Parentheses",
    description: "Remove few elements rendering string parentheses formulations valid.",
    difficulty: "Hard",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "306",
    title: "Additive Number",
    description: "Decide if digit strings sequence fits additive pattern relationships.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "489",
    title: "Robot Room Cleaner",
    description: "Program robots navigating grid cleanups in backtracking traversals.",
    difficulty: "Hard",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "797",
    title: "All Paths From Source to Target",
    description: "Determine paths leading from source node indexing zero to destination.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "842",
    title: "Split Array into Fibonacci Sequence",
    description: "Identify subsets matching Fibonacci math sequences formula relationships.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "1079",
    title: "Letter Tile Possibilities",
    description: "Form unique permutations sequences from subsets of letter tiles.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "1239",
    title: "Maximum Length of Concatenated String",
    description: "Form target words maximizing lengths with strictly unique alphabet symbols.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "1254",
    title: "Number of Closed Islands",
    description: "Count land islands in grid completely surrounded by water cells.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "1415",
    title: "The k-th Lexicographical String",
    description: "Construct happy strings avoiding repeating adjacent characters recursively.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },
  {
    leetcode_number: "1849",
    title: "Splitting String Into Consecutive Values",
    description: "Form consecutive descending series from digit string inputs.",
    difficulty: "Medium",
    category: "Backtracking",
    module: "Advanced"
  },

  // Advanced: Dynamic Programming (251-280)
  {
    leetcode_number: "70",
    title: "Climbing Stairs",
    description: "Determine unique ways to scale a staircase step sequence.",
    difficulty: "Easy",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "746",
    title: "Min Cost Climbing Stairs",
    description: "Climb step layouts minimizing payment costs constraints.",
    difficulty: "Easy",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "198",
    title: "House Robber",
    description: "Find max profit you can acquire robbing alternate houses parameters.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "213",
    title: "House Robber II",
    description: "Solve home rob optimizations when nodes layout behaves circularly.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "322",
    title: "Coin Change",
    description: "Find fewest coins necessary to sum to target value parameter.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "300",
    title: "Longest Increasing Subsequence",
    description: "Find longest increasing sequence length in arbitrary array lists.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "1143",
    title: "Longest Common Subsequence",
    description: "Find longest matching sequence length across both strings parameters.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "518",
    title: "Coin Change II",
    description: "Find total combinatorics ways to make sum utilizing coins values lists.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "494",
    title: "Target Sum",
    description: "Interleave math signs (add/sub) to reach a sum target.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "72",
    title: "Edit Distance",
    description: "Minimum character edits required to morph word string parameters.",
    difficulty: "Hard",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "5",
    title: "Longest Palindromic Substring",
    description: "Identify largest palindromic substring inside target texts parameter.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "62",
    title: "Unique Paths",
    description: "Count distinct path lines navigating grids safely down-right directions.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "63",
    title: "Unique Paths II",
    description: "Identify unique routes across grid systems containing blocking elements.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "64",
    title: "Minimum Path Sum",
    description: "Navigate 2D arrays minimizing math summary values traversal.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "91",
    title: "Decode Ways",
    description: "Count valid decoding patterns mapping numeric strings to letters.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "139",
    title: "Word Break",
    description: "Test if dict entries compile valid text alignments segments.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "152",
    title: "Maximum Product Subarray",
    description: "Find continuous array elements yielding max math product multiplication.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "309",
    title: "Best Time to Buy and Sell Stock with Cooldown",
    description: "Trade stocks maximizing profits subject to forced day cooldown limits.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "377",
    title: "Combination Sum IV",
    description: "Find sum combinations in lists when sequence order matters.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "416",
    title: "Partition Equal Subset Sum",
    description: "Verify if arrays segment into two identical total subset sums.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "97",
    title: "Interleaving String",
    description: "Evaluate if letters merge weaving correctly ordered string structures.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "115",
    title: "Distinct Subsequences",
    description: "Count occurrences matching target formats leveraging DP transformations.",
    difficulty: "Hard",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "312",
    title: "Burst Balloons",
    description: "Maximize coins score bursting balloons sequence boundaries (Interval DP).",
    difficulty: "Hard",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "123",
    title: "Best Time to Buy and Sell Stock III",
    description: "Maximize trades profit restricted to at most two stock transactions.",
    difficulty: "Hard",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "188",
    title: "Best Time to Buy and Sell Stock IV",
    description: "Maximize stock transactions trades scaling bound constraint count limit k.",
    difficulty: "Hard",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "1049",
    title: "Last Stone Weight II",
    description: "Minimize residual weight collision outputs utilizing DP partition checks.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "1137",
    title: "N-th Tribonacci Number",
    description: "Compute the sum of three historical steps in Tribonacci series.",
    difficulty: "Easy",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "1277",
    title: "Count Square Submatrices",
    description: "Identify all filled square submatrices consisting entirely of 1s.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "1641",
    title: "Count Sorted Vowel Strings",
    description: "Generate lexicographical vowel sequence variants sizing math limits k.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    module: "Advanced"
  },
  {
    leetcode_number: "1646",
    title: "Get Maximum in Generated Array",
    description: "Rebuild custom series arrays retrieving maximal value placement nodes.",
    difficulty: "Easy",
    category: "Dynamic Programming",
    module: "Advanced"
  },

  // Advanced: Tries & Heaps & Bit Manipulation (281-305)
  {
    leetcode_number: "208",
    title: "Implement Trie (Prefix Tree)",
    description: "Support prefix checks inserting sequences in lookup trees.",
    difficulty: "Medium",
    category: "Tries",
    module: "Advanced"
  },
  {
    leetcode_number: "211",
    title: "Design Add and Search Words",
    description: "Build dictionaries supporting wildcard search lookup keys.",
    difficulty: "Medium",
    category: "Tries",
    module: "Advanced"
  },
  {
    leetcode_number: "212",
    title: "Word Search II",
    description: "Locate matching strings across grids using Trie routing validations.",
    difficulty: "Hard",
    category: "Tries",
    module: "Advanced"
  },
  {
    leetcode_number: "215",
    title: "Kth Largest Element in an Array",
    description: "Retrieve items sorting priority indexes using min/max Heaps.",
    difficulty: "Medium",
    category: "Heaps",
    module: "Advanced"
  },
  {
    leetcode_number: "973",
    title: "K Closest Points to Origin",
    description: "Locate closest points arrays computing Pythagorean values via Heaps.",
    difficulty: "Medium",
    category: "Heaps",
    module: "Advanced"
  },
  {
    leetcode_number: "621",
    title: "Task Scheduler",
    description: "Optimize processor tasks intervals sorting priority metrics over Heaps.",
    difficulty: "Medium",
    category: "Heaps",
    module: "Advanced"
  },
  {
    leetcode_number: "355",
    title: "Design Twitter",
    description: "Design social feeds sorting time updates using priority queue Heaps.",
    difficulty: "Medium",
    category: "Heaps",
    module: "Advanced"
  },
  {
    leetcode_number: "295",
    title: "Find Median from Data Stream",
    description: "Measure median levels streaming numbers leveraging two heaps dynamically.",
    difficulty: "Hard",
    category: "Heaps",
    module: "Advanced"
  },
  {
    leetcode_number: "191",
    title: "Number of 1 Bits",
    description: "Compute set bits within integer values efficiently using bit manipulation.",
    difficulty: "Easy",
    category: "Bit Manipulation",
    module: "Advanced"
  },
  {
    leetcode_number: "190",
    title: "Reverse Bits",
    description: "Invert standard binary layout ordering configurations.",
    difficulty: "Easy",
    category: "Bit Manipulation",
    module: "Advanced"
  },
  {
    leetcode_number: "338",
    title: "Counting Bits",
    description: "Compute arrays set bit values incrementally up to target indices bounds.",
    difficulty: "Easy",
    category: "Bit Manipulation",
    module: "Advanced"
  },
  {
    leetcode_number: "268",
    title: "Missing Number",
    description: "Isolate missing numbers using single XOR arithmetic expressions.",
    difficulty: "Easy",
    category: "Bit Manipulation",
    module: "Advanced"
  },
  {
    leetcode_number: "136",
    title: "Single Number",
    description: "Identify unique list element XORing all duplicate items instantly.",
    difficulty: "Easy",
    category: "Bit Manipulation",
    module: "Advanced"
  },
  {
    leetcode_number: "371",
    title: "Sum of Two Integers",
    description: "Sum numbers mathematically avoiding standard sum arithmetic parameters (+,-).",
    difficulty: "Medium",
    category: "Bit Manipulation",
    module: "Advanced"
  },
  {
    leetcode_number: "421",
    title: "Maximum XOR of Two Numbers",
    description: "Optimize XOR matches exploring bit prefixes inside Trie structures.",
    difficulty: "Medium",
    category: "Bit Manipulation",
    module: "Advanced"
  },
  {
    leetcode_number: "23",
    title: "Merge k Sorted Lists",
    description: "Sort k lists using Priority Queue min-heaps O(N log k).",
    difficulty: "Hard",
    category: "Heaps",
    module: "Advanced"
  },
  {
    leetcode_number: "632",
    title: "Smallest Range Covering Elements from K Lists",
    description: "Locate tightest bounds coverage utilizing priority heap tracking.",
    difficulty: "Hard",
    category: "Heaps",
    module: "Advanced"
  },
  {
    leetcode_number: "297",
    title: "Serialize and Deserialize Binary Tree",
    description: "Convert trees to string formats and reconstruct elements shapes.",
    difficulty: "Hard",
    category: "Trees",
    module: "Intermediate"
  },
  {
    leetcode_number: "1024",
    title: "Video Stitching",
    description: "Identify minimum sub-ranges covering complete range clips sequentially.",
    difficulty: "Medium",
    category: "Greedy",
    module: "Advanced"
  },
  {
    leetcode_number: "135",
    title: "Candy",
    description: "Distribute candy allocations relative adjacent neighbors metrics.",
    difficulty: "Hard",
    category: "Greedy",
    module: "Advanced"
  },
  {
    leetcode_number: "55",
    title: "Jump Game",
    description: "Assess if reachable indexes permit moving to final array slots.",
    difficulty: "Medium",
    category: "Greedy",
    module: "Advanced"
  },
  {
    leetcode_number: "45",
    title: "Jump Game II",
    description: "Count minimum jump leaps required to reach final array indices.",
    difficulty: "Medium",
    category: "Greedy",
    module: "Advanced"
  },
  {
    leetcode_number: "763",
    title: "Partition Labels",
    description: "Segment strings where individual sections enclose matching characters together.",
    difficulty: "Medium",
    category: "Greedy",
    module: "Advanced"
  },
  {
    leetcode_number: "846",
    title: "Hand of Straights",
    description: "Partition cards into consecutive grouping sequences sizing math values.",
    difficulty: "Medium",
    category: "Greedy",
    module: "Advanced"
  },
  {
    leetcode_number: "1899",
    title: "Merge Triplets to Form Target Triplet",
    description: "Verify if greedy max choice operations construct custom targets.",
    difficulty: "Medium",
    category: "Greedy",
    module: "Advanced"
  }
];
