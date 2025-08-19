const articlesData = [
  {
    topic: "Arrays",
    articles: [
      {
        id: "arr-1",
        title: "Introduction to Arrays",
        markdown: `# Arrays
Arrays are a collection of items stored at contiguous memory locations.`,
        codeSnippets: {
          cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
    int arr[] = {1,2,3};
    cout << arr[0];
}`,
          java: `class Main {
    public static void main(String[] args) {
        int[] arr = {1,2,3};
        System.out.println(arr[0]);
    }
}`,
          python: `arr = [1,2,3]
print(arr[0])`,
          javascript: `let arr = [1,2,3];
console.log(arr[0]);`,
        },
      },
      {
        id: "arr-2",
        title: "Spiral Matrix",
        markdown: `# Spiral Matrix
Print the elements of a matrix in spiral order.`,
        codeSnippets: {
          cpp: `// C++ solution`,
          java: `// Java solution`,
          python: `# Python solution`,
          javascript: `// JS solution`,
        },
      },
    ],
  },
  {
    topic: "Linked List",
    articles: [
      {
        id: "ll-1",
        title: "Introduction to Linked List",
        markdown: `# Linked List
A linked list is a linear data structure where elements are connected using pointers.`,
        codeSnippets: {
          cpp: `struct Node {
    int data;
    Node* next;
};`,
          java: `class Node {
    int data;
    Node next;
    Node(int d) { data = d; }
}`,
          python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None`,
          javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}`,
        },
      },
      {
        id: "ll-2",
        title: "Reverse Linked List",
        markdown: `# Reverse Linked List
Iteratively and recursively reverse a linked list.`,
        codeSnippets: {
          cpp: `// C++ reverse linked list`,
          java: `// Java reverse linked list`,
          python: `# Python reverse linked list`,
          javascript: `// JS reverse linked list`,
        },
      },
    ],
  },
  {
    topic: "Stacks",
    articles: [
      {
        id: "st-1",
        title: "Stack Using Arrays",
        markdown: `# Stack
Stack follows LIFO principle.`,
        codeSnippets: {
          cpp: `// C++ stack`,
          java: `// Java stack`,
          python: `# Python stack`,
          javascript: `// JS stack`,
        },
      },
    ],
  },
  {
    topic: "Queues",
    articles: [
      {
        id: "q-1",
        title: "Queue Using Arrays",
        markdown: `# Queue
Queue follows FIFO principle.`,
        codeSnippets: {
          cpp: `// C++ queue`,
          java: `// Java queue`,
          python: `# Python queue`,
          javascript: `// JS queue`,
        },
      },
    ],
  },
  {
    topic: "Trees",
    articles: [
      {
        id: "bt-1",
        title: "Binary Tree Introduction",
        markdown: `# Binary Tree
A binary tree is a tree data structure in which each node has at most two children.`,
        codeSnippets: {
          cpp: `// C++ binary tree`,
          java: `// Java binary tree`,
          python: `# Python binary tree`,
          javascript: `// JS binary tree`,
        },
      },
      {
        id: "bt-2",
        title: "Binary Tree Traversals",
        markdown: `# Binary Tree Traversals
Inorder, Preorder, Postorder traversals.`,
        codeSnippets: {
          cpp: `// C++ traversals`,
          java: `// Java traversals`,
          python: `# Python traversals`,
          javascript: `// JS traversals`,
        },
      },
    ],
  },
  {
    topic: "Graphs",
    articles: [
      {
        id: "gr-1",
        title: "Graph Representation",
        markdown: `# Graphs
Graphs can be represented using adjacency matrix or adjacency list.`,
        codeSnippets: {
          cpp: `// C++ graph`,
          java: `// Java graph`,
          python: `# Python graph`,
          javascript: `// JS graph`,
        },
      },
      {
        id: "gr-2",
        title: "BFS & DFS",
        markdown: `# BFS & DFS
Two common graph traversal techniques.`,
        codeSnippets: {
          cpp: `// BFS DFS C++`,
          java: `// BFS DFS Java`,
          python: `# BFS DFS Python`,
          javascript: `// BFS DFS JS`,
        },
      },
    ],
  },
  {
    topic: "Dynamic Programming",
    articles: [
      {
        id: "dp-1",
        title: "Fibonacci DP",
        markdown: `# Fibonacci
Solve Fibonacci using dynamic programming.`,
        codeSnippets: {
          cpp: `// C++ Fibonacci DP`,
          java: `// Java Fibonacci DP`,
          python: `# Python Fibonacci DP`,
          javascript: `// JS Fibonacci DP`,
        },
      },
      {
        id: "dp-2",
        title: "Knapsack Problem",
        markdown: `# 0/1 Knapsack
Classic DP problem.`,
        codeSnippets: {
          cpp: `// C++ Knapsack`,
          java: `// Java Knapsack`,
          python: `# Python Knapsack`,
          javascript: `// JS Knapsack`,
        },
      },
    ],
  },
];

export default articlesData;
