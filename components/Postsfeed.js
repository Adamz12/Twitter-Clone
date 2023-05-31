import { db } from "@/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { data } from "browserslist";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";
import Tweetinput from "./Tweetinput";

function Postsfeed() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tweetData = snapshot.docs.map((doc) => doc.data());
      console.log("Tweet data:", tweetData);
      setTweets(snapshot.docs);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log(tweets); // Log the current value of `tweets` whenever it changes
  }, [tweets]);

  return (
    <div className="sm: ml-20 xl:ml-80 max-w-xl flex-grow border-gray-700 border-x">
      <div className="px-3 py-2 text-lg sm:text-xl font-bold border-b border-gray-700 sticky top-0 z-50">
        Home
      </div>
      <Tweetinput />

      {tweets.map((tweet) => {
        return <Tweet key={tweet.id} id={tweet.id} data={tweet.data()} />;
      })}
    </div>
  );
}

export default Postsfeed;
