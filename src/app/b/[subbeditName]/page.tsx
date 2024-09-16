"use client"

import { useSidebar } from "@/app/context/useSidebar";
import Post from "./Post";
import { useEffect, useState } from "react";
import SidebarContent from "./SidebarContent";
import { PostModel } from "@/app/types/model";
import axios from "@configs/axios";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SubbeditPage({ params }: { params: { subbeditName: string } }) {
    
    const pathName = usePathname();
    const { setContent } = useSidebar();
    const [openedTab, setOpenedTab] = useState(0);
    const [posts, setPosts] = useState<PostModel[]>([]);

    useEffect(() => {
        console.log(params.subbeditName);
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`/subbedit/${params.subbeditName}/post`);
                console.log(response.data);
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        setContent(<SidebarContent></SidebarContent>);

        return () => setContent(null);
    }, [setContent, params.subbeditName]);

    return (
        <>
            <div className="w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl">b/{params.subbeditName}</h2>
                    <Link href={pathName + "/new"}>Create New Post</Link>
                </div>
                <div className="max-[900px]:flex hidden gap-1 mb-4 border-b-2 ">
                    <button
                        className={`text-lg border-t-2 border-r-2 border-l-2 rounded-lg rounded-b-none px-2 cursor-pointer transition-all ${openedTab === 0 ? 'bg-slate-200' : 'hover:text-blue-500 hover:bg-slate-200'}`}
                        onClick={() => setOpenedTab(0)}
                    >
                        Posts
                    </button>
                    <button
                        className={`text-lg border-t-2 border-r-2 border-l-2 rounded-lg rounded-b-none px-2 cursor-pointer transition-all ${openedTab === 1 ? 'bg-slate-200' : 'hover:text-blue-500 hover:bg-slate-200'}`}
                        onClick={() => setOpenedTab(1)}
                    >
                        About
                    </button>
                </div>

                {openedTab === 0 ? (
                    <>
                        <h3 className="text-2xl">Recent Posts: </h3>
                        {posts.map((post, index) => {
                            return (
                                <Post post={post} key={index} withUser />
                            )
                        })}
                    </>
                ) : (
                    <SidebarContent></SidebarContent>
                )}
            </div>
        </>
    )
}

export default SubbeditPage;