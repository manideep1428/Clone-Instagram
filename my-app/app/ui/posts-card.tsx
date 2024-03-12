// 'use client' is not necessary in React code, so it can be omitted

import axios from "axios";
import HomeLayout from "./home-nav-bar";
import PostsCard from "./posts-card";
import { useState } from "react";

export default function Dashboard() {
  const [post, setPost] = useState([]);

  const getData = async () => {
    let response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    let postData = response.data;
    setPost(postData);
  };

  getData();

  return (
    <div className="flex">
      <div className="md:bg-slate-800 w-60 h-[658px] fixed">
        <HomeLayout />
      </div>
      <div className="transition-all duration-300 ease-in-out flex flex-wrap items-center pt-16 justify-center flex-shrink md:flex-shrink-0">
        {post.map((eachPost) => (
          <PostsCard
            key={eachPost.id}
            title={eachPost.title}
            body={eachPost.body}
          />
        ))}
      </div>
    </div>
  );
}
