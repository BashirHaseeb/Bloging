
import { Button } from "@/components/ui/button";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import TypewriterEffect from "@/components/Typewritter";


export default function Blogs() {
    // Get the blog directory path
    const blogDirectory = path.join(process.cwd(), 'content');

    // Read all the markdown files in the content directory
    const blogFiles = fs.readdirSync(blogDirectory);

    // Create an array of blogs by extracting the front matter from each file
    const blogs = blogFiles.map((fileName) => {
        // Get the file path
        const fullPath = path.join(blogDirectory, fileName);

        // Read the file content
        const fileContent = fs.readFileSync(fullPath, 'utf-8');

        // Use gray-matter to parse the front matter (metadata) and content
        const { data, content } = matter(fileContent);
        // Return an object with extracted metadata and slug
        return {
            title: data.title,
            description: data.description,
            image: data.image,  // Default image if none provided in metadata
            author: data.author,
            date: data.date,
            slug: data.slug,
            content: content, // Optional: can be used later for rendering the full content
        };
    });

    return (
        <div className="min-h-screen">

            <section className="container mx-auto px-4 py-6">
                <div className="flex flex-col-reverse md:justify-center items-center gap-6 text-4xl font-bold text-center mb-20 p-2 pb-4 border-b-2 ">
                    <TypewriterEffect text="Abdullah's Blog Hub!" />
                    <img className="w-20 md:w-40 rounded-full" src="/logo.webp" alt="" />
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-10 md:px-24">
                    {blogs.map((blog) => (
                        <div
                            key={blog.slug}
                            className="cursor-pointer rounded-lg hover:shadow-xl transform transition-all hover:scale-105 border duration-300 border-gray-500 hover:border-yellow-300 hover:border-2 relative mb-14 shadow-lg">

                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="px-4 py-2 mb-14">
                                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                                <p className="text-sm mb-4">{blog.description}</p>
                                <div className="flex justify-between items-center font-semibold text-sm">
                                    <span><span className="font-normal">By: </span> {blog.author}</span>
                                    <span>{blog.date}</span>
                                </div>
                            </div>
                            <div className="flex justify-center items-center my-1 mb-2 absolute bottom-1 w-full">
                                <Button variant="outline">
                                    <Link href={`/blogpost/${blog.slug}`}>Read More</Link>
                                </Button>
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </div>
    );
}
