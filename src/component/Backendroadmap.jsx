import React from "react";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

const playlists = [
  {
    title: "MERN Stack Full Course",
    thumbnail: "https://img.youtube.com/vi/T55Kb8rrH1g/hqdefault.jpg",
    link: "https://youtu.be/T55Kb8rrH1g?si=bckr8R_nm3ErYxKj",
    videos: "120 videos",
    channel: "Sheryians Coding School",
  },
   
  {
    title: "DSA for Beginners",
    thumbnail: "https://img.youtube.com/vi/WQoB2z67hvY/hqdefault.jpg",
    link: "https://youtu.be/WQoB2z67hvY",
    videos: "60 videos",
    channel: "Love Babbar",
  },
];

export default function PlaylistRow() {
  return (
    <div className="p-6 mt-9 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        📺 Sheryians Coding School Playlists and Dsa playlist Love Babbar
      </h2>

      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
        {playlists.map((pl, index) => (
          <motion.a
            key={index}
            href={pl.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="min-w-[280px] rounded-2xl shadow-md bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <div className="relative">
              <img
                src={pl.thumbnail}
                alt={pl.title}
                className="w-full h-44 object-cover"
              />
              {/* Overlay Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition duration-300">
                <PlayCircle className="text-white w-12 h-12" />
              </div>
              {/* Video Count */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md">
                {pl.videos}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold line-clamp-2">{pl.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{pl.channel}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
