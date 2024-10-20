import UpvoteButton from "@/app/components/elements/UpvoteButton";
import { PostWithUserAndSubbedit } from "@/app/types/post";
import postImg from "@public/post-img-example.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ChatDots } from "react-bootstrap-icons";

interface PostProps {
  post: PostWithUserAndSubbedit;
  withUser?: boolean;
  withSubbedit?: boolean;
}

const Post: FC<PostProps> = ({ post, withUser, withSubbedit }): JSX.Element => {
  const router = useRouter();

  return (
    <article
      className="mb-4 cursor-pointer rounded border border-gray-400 p-4 transition-colors hover:bg-gray-100"
      onClick={() =>
        router.push(
          `/b/${post.Subbedit.name}/${binaryToBase36(post.id)}/comment`,
        )
      }
    >
      <div onClick={(e) => e.stopPropagation()}>
        {withUser && (
          <p className="text-sm font-semibold text-gray-600 hover:text-green-500">
            u/{post.User.username}{" "}
            <span className="hover: text-gray-600">
              &middot; {strToReadable(post.createdAt.toString())} ago
            </span>
          </p>
        )}
        {withSubbedit && (
          <Link
            href={`/b/${post.Subbedit.name}`}
            className="text-sm font-semibold text-gray-600 hover:text-green-500"
          >
            from b/{post.Subbedit.name}{" "}
            <span className="hover: text-gray-600">
              &middot; {strToReadable(post.createdAt.toString())} ago
            </span>
          </Link>
        )}

        <Link
          href={`/b/${post.Subbedit.name}/${binaryToBase36(post.id)}/comment`}
          passHref
        >
          <h3 className="text-xl font-bold hover:underline">{post.title}</h3>
        </Link>
        <div className="mb-2 flex gap-2">
          <span className="rounded-full bg-yellow-300 px-2 text-sm text-black">
            Tech
          </span>
          <span className="rounded-full bg-blue-400 px-2 text-sm text-black">
            React
          </span>
        </div>
        <Image
          src={postImg}
          alt="Image Post"
          width={600}
          height={400}
          className="rounded-lg"
        />
        <div className="mt-2 flex">
          <div className="flex items-center gap-4">
            <UpvoteButton post={post} />
            <div className="flex items-center gap-1 rounded-lg bg-gray-200 px-4 py-1 hover:bg-gray-300">
              <button>
                <ChatDots size={19} />
              </button>
              <p>{post.commentCount}</p>
            </div>
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
