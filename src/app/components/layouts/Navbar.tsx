import Link from "next/link"

export const Navbar = () => {
    return (
        <div className="w-full h-14 border border-b-gray-400 flex justify-between items-center px-8">
            <h2 className="text-4xl text-blue-600">
                <Link href={"/"}>
                    Beddit
                </Link>
            </h2>
            <p>
                Settings
            </p>
        </div>
    )
}