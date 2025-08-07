import React, { useState } from "react";
import { articlesData } from "./article";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ArticleViewer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = articlesData.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.stage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="🔍 Search by title or stage..."
          className="w-full p-3 mb-6 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {selectedArticle ? (
          <div className="bg-white p-6 rounded shadow">
            <button
              className="mb-4 text-blue-500"
              onClick={() => setSelectedArticle(null)}
            >
              ← Back to all articles
            </button>

            <h2 className="text-2xl font-bold mb-2">{selectedArticle.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              📚 {selectedArticle.stage} • 🎯 {selectedArticle.level}
            </p>
            <p className="mb-4">{selectedArticle.description}</p>

            <ReactMarkdown
              children={selectedArticle.markdown}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />

            {selectedArticle.playgroundUrl && (
              <a
                href={selectedArticle.playgroundUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                🚀 Try on Playground
              </a>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((article, index) => (
              <div
                key={index}
                onClick={() => setSelectedArticle(article)}
                className="cursor-pointer bg-white p-4 rounded shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500 mb-1">
                  {article.stage} • {article.level}
                </p>
                <p className="text-sm text-gray-600">
                  {article.description.slice(0, 60)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
