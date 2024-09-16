"use client"

import React, { useState } from "react";
import axios from "@configs/axios";
import { useRouter } from "next/navigation";

const FormNewPost = ({ params }: {params: { subbeditName: string }}) => {
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/subbedit/${params.subbeditName}/post`, { title, body: content });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        router.back()
    };

    return (
        <div className="w-full flex justify-center ">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[800px]">
                <input
                    placeholder="Title"
                    type="text"
                    id="title"
                    name="title"
                    className="bg-slate-300 rounded-lg p-4 w-[400px]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    id="content"
                    name="content"
                    className="bg-slate-300 rounded-lg p-4 w-[400px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                    <button className="bg-orange-400 p-4 rounded-lg" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default FormNewPost