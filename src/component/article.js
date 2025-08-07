export const articlesData = [
  // Arrays
  {
    stage: "Arrays",
    title: "Reverse Array",
    markdown: `\`\`\`cpp
void reverse(int arr[], int n) {
  int l = 0, r = n - 1;
  while (l < r) {
    swap(arr[l], arr[r]);
    l++, r--;
  }
}
\`\`\``,
    level: "Easy",
    description: "Reverse an array using the 2-pointer approach.",
    playgroundUrl: "https://your-playground.com/reverse-array"
  },
  {
    stage: "Arrays",
    title: "Find Max Element",
    markdown: `\`\`\`cpp
int findMax(int arr[], int n) {
  int maxVal = arr[0];
  for (int i = 1; i < n; i++) {
    if (arr[i] > maxVal) maxVal = arr[i];
  }
  return maxVal;
}
\`\`\``,
    level: "Easy",
    description: "Find the maximum element in an array.",
    playgroundUrl: "https://your-playground.com/find-max"
  },

  // Strings
  {
    stage: "Strings",
    title: "Palindrome Check",
    markdown: `\`\`\`cpp
bool isPalindrome(string s) {
  int l = 0, r = s.size() - 1;
  while (l < r) {
    if (s[l] != s[r]) return false;
    l++, r--;
  }
  return true;
}
\`\`\``,
    level: "Medium",
    description: "Check whether a string is a palindrome.",
    playgroundUrl: "https://your-playground.com/palindrome"
  },

  // Math
  {
    stage: "Math",
    title: "Check Prime",
    markdown: `\`\`\`cpp
bool isPrime(int n) {
  if (n <= 1) return false;
  for (int i = 2; i * i <= n; i++) {
    if (n % i == 0) return false;
  }
  return true;
}
\`\`\``,
    level: "Easy",
    description: "Check if a number is prime using trial division.",
    playgroundUrl: "https://your-playground.com/prime-check"
  },

  // Recursion
  {
    stage: "Recursion",
    title: "Factorial Using Recursion",
    markdown: `\`\`\`cpp
int factorial(int n) {
  if (n == 0) return 1;
  return n * factorial(n - 1);
}
\`\`\``,
    level: "Easy",
    description: "Calculate factorial of a number using recursion.",
    playgroundUrl: "https://your-playground.com/factorial"
  },

  // Searching
  {
    stage: "Binary Search",
    title: "Binary Search on Sorted Array",
    markdown: `\`\`\`cpp
int binarySearch(int arr[], int n, int target) {
  int l = 0, r = n - 1;
  while (l <= r) {
    int mid = l + (r - l) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) l = mid + 1;
    else r = mid - 1;
  }
  return -1;
}
\`\`\``,
    level: "Medium",
    description: "Standard binary search implementation.",
    playgroundUrl: "https://your-playground.com/binary-search"
  },

  // Hashing
  {
    stage: "Hashing",
    title: "Frequency Count using Map",
    markdown: `\`\`\`cpp
unordered_map<int, int> frequency(int arr[], int n) {
  unordered_map<int, int> mp;
  for (int i = 0; i < n; i++) {
    mp[arr[i]]++;
  }
  return mp;
}
\`\`\``,
    level: "Easy",
    description: "Count frequency of elements using hashmap.",
    playgroundUrl: "https://your-playground.com/frequency-map"
  },

  // Stack
  {
    stage: "Stack",
    title: "Valid Parentheses",
    markdown: `\`\`\`cpp
bool isValid(string s) {
  stack<char> st;
  for (char c : s) {
    if (c == '(' || c == '{' || c == '[') st.push(c);
    else {
      if (st.empty()) return false;
      char top = st.top();
      if ((c == ')' && top != '(') || 
          (c == '}' && top != '{') || 
          (c == ']' && top != '[')) return false;
      st.pop();
    }
  }
  return st.empty();
}
\`\`\``,
    level: "Medium",
    description: "Check for balanced parentheses using stack.",
    playgroundUrl: "https://your-playground.com/valid-parentheses"
  },

  // Linked List
  {
    stage: "Linked List",
    title: "Reverse a Linked List",
    markdown: `\`\`\`cpp
ListNode* reverseList(ListNode* head) {
  ListNode* prev = nullptr;
  while (head) {
    ListNode* next = head->next;
    head->next = prev;
    prev = head;
    head = next;
  }
  return prev;
}
\`\`\``,
    level: "Medium",
    description: "Iteratively reverse a singly linked list.",
    playgroundUrl: "https://your-playground.com/reverse-ll"
  },

  // Trees
  {
    stage: "Binary Tree",
    title: "Inorder Traversal",
    markdown: `\`\`\`cpp
void inorder(TreeNode* root) {
  if (!root) return;
  inorder(root->left);
  cout << root->val << " ";
  inorder(root->right);
}
\`\`\``,
    level: "Easy",
    description: "Recursive inorder traversal of binary tree.",
    playgroundUrl: "https://your-playground.com/inorder"
  },

  // Graphs
  {
    stage: "Graphs",
    title: "DFS on Graph",
    markdown: `\`\`\`cpp
void dfs(int node, vector<int> adj[], vector<bool>& visited) {
  visited[node] = true;
  for (int neighbor : adj[node]) {
    if (!visited[neighbor])
      dfs(neighbor, adj, visited);
  }
}
\`\`\``,
    level: "Medium",
    description: "Depth First Search traversal on a graph.",
    playgroundUrl: "https://your-playground.com/dfs"
  },

  // Dynamic Programming
  {
    stage: "Dynamic Programming",
    title: "Fibonacci Using DP",
    markdown: `\`\`\`cpp
int fib(int n) {
  if (n <= 1) return n;
  vector<int> dp(n + 1);
  dp[0] = 0; dp[1] = 1;
  for (int i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
\`\`\``,
    level: "Easy",
    description: "Bottom-up DP solution for Fibonacci number.",
    playgroundUrl: "https://your-playground.com/fib-dp"
  }
];
export default articlesData;