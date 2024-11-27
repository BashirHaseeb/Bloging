import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from '/components/CopyButton'; // Import directly


export default async function Page({ params }) {
    const slug = (await params).slug;

    // Define the directory containing the blog files
    const blogDirectory = path.join(process.cwd(), 'content');

    // Read all markdown files in the content directory
    const blogFiles = fs.readdirSync(blogDirectory);

    // Extract metadata and content for all blogs
    const blogs = blogFiles.map((fileName) => {
        const fullPath = path.join(blogDirectory, fileName);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = matter(fileContent);
        return {
            ...data, // Extract metadata (title, description, etc.)
            content, // Include the blog content
        };
    });


    // Find the blog with the matching slug
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
        return (
            <div className="max-w-4xl mx-auto py-10 px-5">
                <h1 className="text-3xl font-bold">404 - Blog Not Found</h1>
                <p className="text-sm mt-2">The blog you are looking for does not exist.</p>
            </div>
        );
    }


    // Custom renderer to handle code blocks with syntax highlighting
    const renderers = {
        code({ node, inline, className, children, ...props }) {
            const language = className?.replace(/language-/, '') || 'bash'; // Default to 'bash' if no language is provided
            const codeString = String(children).replace(/\n$/, '');  // Get the code as a string

            return !inline ? (
                <div className="relative">
                    <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={language}
                        PreTag="div"
                        {...props}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                    <CopyButton code={codeString} /> {/* Correct prop passed here */}
                </div>
            ) : (
                <code {...props}>{children}</code>
            );
        },
    };

    ``

    return (
        <div>
            {/* Blog Image at the Top */}
            <img
                src={blog.image || '/path/to/default/image.jpg'} // Fallback for missing image
                className="w-full h-[400px] object-cover mb-6"
                alt="Blog Image"
            />

            <div className="max-w-4xl mx-auto py-10 px-5">
                {/* Blog Header */}
                <div className="border-b pb-4 mb-6">
                    <h1 className="text-3xl font-bold">{blog.title}</h1>
                    <p className="border-l-4 pl-2 text-sm italic mt-2">{blog.description}</p>
                    <p className="text-sm mt-1">
                        <span className="italic text-lg font-semibold">By:</span> {blog.author} on {blog.date}
                    </p>
                </div>

                {/* Blog Content */}
                <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown components={renderers}>{blog.content}</ReactMarkdown>
                </div>

                {/* Footer */}
                <div className="mt-8 border-t pt-4">
                    <p className="text-sm">
                        Slug: <span className="font-mono text-blue-600">{blog.slug}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
