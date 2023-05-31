import Postsfeed from "@/components/Postsfeed";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import Tweet from "@/components/Tweet";
import { db } from "@/firebase";
import { doc, getDoc } from "@firebase/firestore";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import moment from "moment";
import Link from "next/link";
import Moment from "react-moment";
import { useSelector } from "react-redux";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  console.log(data);

  // timestamp: data?.timestamp?.toDate().toString() || null,
  const formattedData = {
    username: data?.username || null,
    name: data?.name || null,
    photoUrl: data?.photoUrl || null,
    text: data?.tweet || null,
    comments: data?.comments || null,
    timestamp: JSON.stringify(data?.timestamp?.toDate()) || null,
    image: data?.image || null,
  };

  return {
    props: {
      tweetdata: formattedData,
    },
  };
}

export default function CommentsPage({ tweetdata }) {
  if (!tweetdata) {
    return null; // Return null or a loading indicator while the data is being fetched
  }
  const user = useSelector((state) => state.user);
  console.log(tweetdata);
  console.log(user);
  return (
    <div className="text-white">
      <div className="bg-black min-h-screen text-[#e7e9ea] max-w-[1400px] mx-auto flex">
        <Sidebar />
        <div className="sm: ml-20 xl:ml-80 max-w-xl flex-grow border-gray-700 border-x">
          <div className=" flex space-x-2 px-3 py-2 text-lg sm:text-xl font-bold border-b border-gray-700 sticky top-0 z-50">
            <Link href={"/"}>
              <ArrowLeftIcon className="w-7 cursor-pointer" />
            </Link>
            <h1>Tweet</h1>
          </div>
          <div className="border-b border-gray-700">
            <div className="flex space-x-3 p-3 border-b border-gray-700 ">
              <img
                className="w-11 h-11 rounded-full object-cover"
                src={tweetdata?.photoUrl}
              />
              <div>
                <div className="text-gray-500 flex items-center space-x-2 mb-1">
                  <h1 className=" text-white font-bold">{tweetdata.name}</h1>
                  <span>@{tweetdata.username}</span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>

                  <Moment fromNow>{JSON.parse(tweetdata.timestamp)}</Moment>
                </div>

                <span className=" text-2xl">{tweetdata.text}</span>
                {tweetdata.image && (
                  <img
                    className=" object-cover border border-gray-700 rounded-md mt-3 max-h-80"
                    src={tweetdata.image}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border-b border-gray-700 p-2">
            <div className="flex justify-center items-center p-1 space-x-2">
              <img
                className=" w-12 h-12 rounded-full object-cover"
                src={user?.photoUrl}
              />
              <h1 className=" text-2xl text-gray-500">Tweet your reply</h1>
            </div>
            <button
              className="bg-[#1d9bf0] rounded-full px-4 py-1.5 disabled:opacity-50"
              disabled={true}
            >
              Tweet
            </button>
          </div>
          {tweetdata.comments?.map((comment) => (
            <div className="border-b border-gray-700">
              <div className="flex space-x-3 p-3 border-gray-700 ">
                <img
                  className="w-11 h-11 rounded-full object-cover"
                  src={comment?.photoUrl}
                />
                <div>
                  <div className="text-gray-500 flex items-center space-x-2 mb-1">
                    <h1 className=" text-white font-bold">{comment.name}</h1>
                    <span>@{comment.username}</span>

                    <Moment fromNow>{comment.timestamp}</Moment>
                  </div>

                  <span>{comment.comment}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Trending />
      </div>
    </div>
  );
}
