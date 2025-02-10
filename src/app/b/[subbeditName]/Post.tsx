import UpvoteButton from "@/app/components/elements/UpvoteButton";
import { PostWithUserAndSubbedit } from "@/app/types/post";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Chat, Share } from "react-bootstrap-icons";

interface PostProps {
  post: PostWithUserAndSubbedit;
  inSubbedit: boolean;
}

const Post: FC<PostProps> = ({ post, inSubbedit }) => {
  const router = useRouter();

  return (
    // <article
    //   className="mb-4 cursor-pointer rounded p-4 transition-colors  dark:bg-gray-800"
    //   onClick={() =>
    //     router.push(
    //       `/b/${post.Subbedit.name}/${binaryToBase36(post.id)}/comment`,
    //     )
    //   }
    // >
    //   <div onClick={(e) => e.stopPropagation()}>
    //     {withUser && (
    //       <p className="text-sm font-semibold text-gray-600 hover:text-green-500">
    //         u/{post.User.username}{" "}
    //         <span className="hover: text-gray-600">
    //           &middot; {strToReadable(post.createdAt.toString())} ago
    //         </span>
    //       </p>
    //     )}
    //     {withSubbedit && (
    //       <Link
    //         href={`/b/${post.Subbedit.name}`}
    //         className="text-sm font-semibold text-gray-600 hover:text-green-500"
    //       >
    //         from b/{post.Subbedit.name}
    //         <span className="hover: text-gray-600">
    //           &middot; {strToReadable(post.createdAt.toString())} ago
    //         </span>
    //       </Link>
    //     )}

    //     <Link
    //       href={`/b/${post.Subbedit.name}/${binaryToBase36(post.id)}/comment`}
    //       passHref
    //     >
    //       <h3 className="text-xl font-bold hover:underline">{post.title}</h3>
    //     </Link>
    //     {post.Flair && (
    //       <div className="mb-2 flex gap-2">
    //         <span
    //           className={`rounded-full px-2 text-xs text-black`}
    //           style={{ backgroundColor: post.Flair.color }}
    //         >
    //           {post.Flair.name}
    //         </span>
    //       </div>
    //     )}
    //     <p className="text-sm text-gray-700">
    //       {post.body.length > 200 ? `${post.body.slice(0, 200)}...` : post.body}
    //     </p>
    //     {post.mediaUrl && (
    //       <Link
    //         href={`/b/${post.Subbedit.name}/${binaryToBase36(post.id)}/comment`}
    //       >
    //         <Image
    //           src={post.mediaUrl}
    //           alt="Image Post"
    //           width={600}
    //           height={400}
    //           className="rounded-lg"
    //         />
    //       </Link>
    //     )}
    //     <div className="mt-2 flex">
    //       <div className="flex items-center gap-4">
    //         <UpvoteButton post={post} />
    //         <Link
    //           href={`/b/${post.Subbedit.name}/${binaryToBase36(post.id)}/comment`}
    //           className="flex items-center gap-1 rounded-lg bg-gray-200 px-4 py-1 hover:bg-gray-300"
    //         >
    //           <button>
    //             <ChatDots color="white" size={19} />
    //           </button>
    //           <p>{post.commentCount}</p>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </article>

    <article
      key={post.id}
      className="mb-4 rounded-lg bg-gray-800 p-4"
      // onClick={() =>
      //   router.push(
      //     `/b/${post.Subbedit.name}/${binaryToBase36(post.id)}/comment`,
      //   )
      // }
    >
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <UpvoteButton post={post} />
        </div>
        <div className="flex-1">
          {inSubbedit ? (
            <div className="flex gap-2">
              <Image
                className="inline-block self-center rounded-full"
                src={
                  post.User.profilePicUrl
                    ? post.User.profilePicUrl
                    : "https://i.pravatar.cc/40"
                }
                alt="Avatar"
                width={20}
                height={20}
              />
              <Link href={`#`} className="hover:text-green-400">
                <p className="text-sm text-gray-400 transition-colors">
                  u/{post.User.username}
                </p>
              </Link>
            </div>
          ) : (
            <p className="flex gap-1 text-sm text-gray-400 transition-colors">
              <Link
                href={`/b/${post.Subbedit.name}`}
                className="hover:text-orange-400"
              >
                b/{post.Subbedit.name}
              </Link>
              • {strToReadable(post.createdAt.toString())} ago
            </p>
          )}

          <Link
            href={`/b/${post.Subbedit.name}/${binaryToBase36(post.id)}/comment`}
          >
            <h2 className="mb-2 text-lg font-semibold hover:text-blue-400">
              {post.title}
            </h2>
          </Link>

          {post.mediaUrl && (
            <Image
              src={post.mediaUrl}
              alt="Image Post"
              width={600}
              height={400}
              className="mb-4 max-h-96 w-full rounded-lg object-cover"
            />
          )}
          <div className="flex cursor-pointer items-center space-x-4 text-gray-400">
            <Link
              href={`/b/${post.Subbedit.name}/${binaryToBase36(post.id)}/comment`}
              className="flex cursor-pointer items-center space-x-1 rounded-lg p-1 duration-200 dark:hover:bg-gray-700"
            >
              <Chat color="#9ca3af" size={16} />
              <span className="text-sm">{post.commentCount} Comments</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

const strToReadable = (strDate: string): string => {
  const date = new Date(strDate);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "y", seconds: 31536000 },
    { label: "m", seconds: 2592000 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "min", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count}${interval.label}`;
    }
  }

  return `${seconds}s`;
};

const binaryToBase36 = (decimal: number): string => {
  return decimal.toString(36);
};

export default Post;
