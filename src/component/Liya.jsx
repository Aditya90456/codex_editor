import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// This is the sample data for the articles. It now includes all previous entries.
const articlesData = [
  {
    title: "Python Variables and Data Types",
    stage: "Beginner",
    level: "Easy",
    language: "Python",
    description: "Learn about declaring variables and common data types in Python.",
    markdown: `
# Python Variables and Data Types

In Python, variables are created when you assign a value to them. Python is dynamically typed, which means you don't have to explicitly declare the data type of a variable.

\`\`\`python
# A simple integer variable
age = 30
print(f"Age: {age}")

# A string variable
name = "Alice"
print(f"Name: {name}")

# A floating-point number
price = 19.99
print(f"Price: {price}")

# A boolean variable
is_active = True
print(f"Is Active: {is_active}")
\`\`\`
`,
  },
  {
    title: "Control Flow: Loops and Conditionals",
    stage: "Beginner",
    level: "Intermediate",
    language: "Python",
    description: "A deep dive into for loops, while loops, and if-else statements.",
    markdown: `
# Control Flow in Python

Control flow statements allow you to control the execution of your program based on certain conditions.

## If-Else Statements

\`\`\`python
x = 10
if x > 5:
    print("x is greater than 5")
else:
    print("x is not greater than 5")
\`\`\`

## For Loops

\`\`\`python
# A for loop to iterate over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

## While Loops

\`\`\`python
count = 0
while count < 3:
    print(f"Count is {count}")
    count += 1
\`\`\`
`,
  },
  {
    title: "Functions and Scope",
    stage: "Intermediate",
    level: "Intermediate",
    language: "Python",
    description: "Understanding how to define and use functions, and variable scope.",
    markdown: `
# Functions and Scope

Functions are blocks of reusable code that perform a specific task.

## Defining a Function

\`\`\`python
def greet(name):
    """This function greets the person passed in as a parameter."""
    print(f"Hello, {name}!")

greet("Bob")
\`\`\`

## Local vs. Global Scope

Variables defined inside a function have a local scope, while those defined outside are global.

\`\`\`python
global_var = "I'm global"

def my_function():
    local_var = "I'm local"
    print(global_var)
    # print(local_var) # This would work
    
my_function()
# print(local_var) # This would cause an error
\`\`\`
`,
  },
  {
    title: "JavaScript Promises",
    stage: "Intermediate",
    level: "Intermediate",
    language: "JavaScript",
    description: "An introduction to asynchronous programming in JavaScript using Promises.",
    markdown: `
# JavaScript Promises

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
  let success = true; // Simulate a successful operation
  if (success) {
    resolve("The operation was successful!");
  } else {
    reject("The operation failed.");
  }
});

myPromise
  .then((message) => {
    console.log(message); // "The operation was successful!"
  })
  .catch((error) => {
    console.error(error);
  });
\`\`\`
`
  },
  {
    title: "C++ Pointers",
    stage: "Intermediate",
    level: "Hard",
    language: "C++",
    description: "Understanding pointers and memory management in C++.",
    markdown: `
# C++ Pointers

A pointer is a variable that stores the memory address of another variable.

\`\`\`cpp
#include <iostream>

int main() {
    int var = 20;
    int *ptr; // pointer variable

    ptr = &var; // store address of var in pointer variable

    std::cout << "Value of var: " << var << std::endl;
    std::cout << "Address of var: " << &var << std::endl;
    std::cout << "Value of ptr: " << ptr << std::endl;
    std::cout << "Value at ptr address: " << *ptr << std::endl;

    return 0;
}
\`\`\`
`
  },
    {
    title: "Python List Comprehensions",
    stage: "Beginner",
    level: "Easy",
    language: "Python",
    description: "A concise way to create lists in Python.",
    markdown: `
# Python List Comprehensions

List comprehensions offer a shorter syntax when you want to create a new list based on the values of an existing list.

\`\`\`python
# Create a list of squares from 0 to 9
squares = [x**2 for x in range(10)]
print(squares)
# Output: [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Create a list of even numbers from an existing list
numbers = [1, 2, 3, 4, 5, 6]
evens = [x for x in numbers if x % 2 == 0]
print(evens)
# Output: [2, 4, 6]
\`\`\`
`
  },
  {
    title: "Arrays in JavaScript",
    stage: "Beginner",
    level: "Easy",
    language: "JavaScript",
    description: "An introduction to arrays, a fundamental data structure in JavaScript.",
    markdown: `
# Arrays in JavaScript

Arrays are a type of object used to store multiple values in a single variable.

\`\`\`javascript
// Declaring an array
const fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits);

// Accessing elements
console.log(fruits[0]); // "Apple"

// Modifying an element
fruits[1] = "Mango";
console.log(fruits); // ["Apple", "Mango", "Cherry"]

// Adding an element
fruits.push("Orange");
console.log(fruits); // ["Apple", "Mango", "Cherry", "Orange"]
\`\`\`
`
  },
  {
    title: "Bubble Sort Algorithm",
    stage: "Intermediate",
    level: "Intermediate",
    language: "Python",
    description: "Learn one of the simplest sorting algorithms, Bubble Sort.",
    markdown: `
# Bubble Sort Algorithm

Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

my_list = [64, 34, 25, 12, 22, 11, 90]
sorted_list = bubble_sort(my_list)
print("Sorted array is:", sorted_list)
\`\`\`
`
  },
  {
    title: "Linked Lists in C++",
    stage: "Advanced",
    level: "Hard",
    language: "C++",
    description: "Understanding the concept and implementation of a singly linked list.",
    markdown: `
# Linked Lists in C++

A linked list is a linear data structure where elements are not stored at contiguous memory locations.

\`\`\`cpp
#include <iostream>

class Node {
public:
    int data;
    Node* next;
};

void printList(Node* n) {
    while (n != NULL) {
        std::cout << n->data << " ";
        n = n->next;
    }
}

int main() {
    Node* head = NULL;
    Node* second = NULL;
    Node* third = NULL;

    head = new Node();
    second = new Node();
    third = new Node();

    head->data = 1;
    head->next = second;

    second->data = 2;
    second->next = third;

    third->data = 3;
    third->next = NULL;

    printList(head);
    
    return 0;
}
\`\`\`
`
  }
];

// --- Article Viewer Component ---
const ArticleViewer = ({ onSwitchToEditor }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = articlesData.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.stage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="🔍 Search articles by title, stage, or language..."
          className="w-full p-3 mb-6 rounded-lg bg-[#282C4A] border border-[#4B5563] text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {selectedArticle ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#16213E] p-6 rounded-xl shadow-lg border border-[#282C4A]"
          >
            <button
              className="mb-4 text-blue-400 hover:text-blue-300 flex items-center transition"
              onClick={() => setSelectedArticle(null)}
            >
              ← Back to all articles
            </button>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-2">{selectedArticle.title}</h2>
            <p className="text-sm text-gray-400 mb-2">
              📚 {selectedArticle.stage} • 🎯 {selectedArticle.level} • 💻 {selectedArticle.language}
            </p>
            <p className="mb-6 text-gray-300">{selectedArticle.description}</p>

            <ReactMarkdown
              children={selectedArticle.markdown}
              components={{
                h1: ({children}) => <h1 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h1>,
                h2: ({children}) => <h2 className="text-xl font-bold mt-5 mb-2 text-gray-200">{children}</h2>,
                h3: ({children}) => <h3 className="text-lg font-semibold mt-4 mb-1 text-gray-300">{children}</h3>,
                p: ({children}) => <p className="mb-4 text-gray-400 leading-relaxed">{children}</p>,
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                      className="rounded-lg shadow-inner my-4"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-[#282C4A] text-yellow-400 p-1 rounded font-mono text-sm" {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />

            <button
              onClick={onSwitchToEditor}
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              🚀 Go to Python Editor
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedArticle(article)}
                  className="cursor-pointer bg-[#16213E] p-6 rounded-xl shadow-lg border border-[#282C4A] hover:bg-[#1A2542] transition"
                >
                  <h3 className="text-xl font-semibold text-white">{article.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    📚 {article.stage} • 🎯 {article.level} • 💻 {article.language}
                  </p>
                  <p className="text-sm text-gray-400">
                    {article.description.slice(0, 100)}...
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

// --- New Article Editor Component ---
const ArticleEditor = ({ onSwitchToViewer }) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto bg-[#16213E] p-6 rounded-xl shadow-lg border border-[#282C4A] text-white">
        <button
          className="mb-4 text-blue-400 hover:text-blue-300 flex items-center transition"
          onClick={onSwitchToViewer}
        >
          ← Back to articles
        </button>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-4">Code Editor</h2>
        <p className="text-gray-400 mb-6">This is a placeholder for a future code editor. You can implement code editing and execution here.</p>
        <div className="bg-[#282C4A] p-4 rounded-lg shadow-inner h-96 overflow-auto">
          <pre className="text-sm text-yellow-300 font-mono">
            {`# Welcome to the Python Editor!
# You can write and run your Python code here.

def hello_world():
    print("Hello, world!")

hello_world()
`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
// This component manages the state to switch between the ArticleViewer and ArticleEditor.
const App = () => {
  const [view, setView] = useState("viewer");

  const handleSwitchToEditor = () => setView("editor");
  const handleSwitchToViewer = () => setView("viewer");

  return (
    <div className="bg-[#0f172a] text-white min-h-screen flex items-stretch font-sans">
      <AnimatePresence mode="wait">
        {view === "viewer" ? (
          <motion.div key="viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
            <ArticleViewer onSwitchToEditor={handleSwitchToEditor} />
          </motion.div>
        ) : (
          <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
            <ArticleEditor onSwitchToViewer={handleSwitchToViewer} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
