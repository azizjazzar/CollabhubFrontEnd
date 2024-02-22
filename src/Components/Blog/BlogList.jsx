import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { FaCommentAlt } from 'react-icons/fa';
import 'animate.css/animate.min.css';
import { useAuth } from "@/pages/authContext";
import { Footer } from "@/widgets/layout/footer";
import TitleBlog from '@/widgets/layout/titleBlog';


const BlogList = () => {
    const { authData } = useAuth(); // Replace with the actual structure of your authentication hook
    const [blogs, setBlogs] = useState([]);
    const [sortByDate, setSortByDate] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
    });
    const postsPerPage = 3;

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('https://colabhub.onrender.com/blogs/Blogs');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blog articles:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const toggleSortOrder = () => {
        setSortByDate((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const sortBlogsByDate = () => {
        return blogs.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            return sortByDate === 'asc' ? dateA - dateB : dateB - dateA;
        });
    };

    const sortedBlogs = sortBlogsByDate();

    const filteredBlogs = sortedBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);

    const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

    const handleToggleModal = () => {
        if (authData.user) {
            setIsModalOpen(!isModalOpen);
            if (!isModalOpen) {
                setFormData({
                    title: '',
                    description: '',
                    content: '',
                });
            }
        } else {
            console.log("User not authenticated. Redirect or show a message.");
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('https://colabhub.onrender.com/blogs/addBlog', {
                ...formData,
                userId: authData.user._id, // Use the ID of the authenticated user
            });
    
            console.log('Blog added successfully:', response.data);
            fetchBlogs();
        } catch (error) {
            console.error('Error adding blog:', error);
        }
    
        handleToggleModal();
    };

    return (
        <div className="blog-list-container p-20 mt-10 relative">
     <TitleBlog />

            <img
                src="/img/blogback.jpg" // Replace with the path to your image
                alt="Blog Background"
                className="w-full h-[450px] mb-8" // Adjust the class based on your sizing and margin needs
            />

            <div className="flex justify-between items-center mb-8">
                <div className="text-3xl font-bold">Latest Blog Posts</div>
                <div>
                    <button
                        onClick={toggleSortOrder}
                        className="bg-orange-500 p-2 rounded text-white hover:bg-orange-600"
                    >
                        Sort by Date {sortByDate === 'asc' ? 'Ascending' : 'Descending'}
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded-md"
                />
            </div>

            {currentPosts.length > 0 && currentPage === 1 ? (
                <div className="flex">
                    <div className="lg:w-3/4">
                        <ul className="space-y-6">
                            {currentPosts.map((blog) => (
                                <li key={blog._id} className="bg-white rounded-lg p-6 shadow-md">
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={`/img/team-1.jpg`}
                                            alt="User"
                                            className="w-10 h-10 rounded-full mr-2"
                                        />
                                        <span className="text-gray-700">
                                            {blog.user ? `${blog.user.nom} ${blog.user.prenom}` : 'idriss el bessi'}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                                    <p className="text-gray-600">{blog.description}</p>
                                    <p className="text-gray-500 mt-2">
                                        Posted on {format(new Date(blog.date), 'MMMM dd, yyyy')}
                                    </p>
                                    <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                                        See More
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-center mt-4 border p-4 rounded-lg">
                            <nav>
                                <ul className="pagination flex space-x-2">
                                    <li className="page-item">
                                        <button
                                            onClick={prevPage}
                                            disabled={currentPage === 1}
                                            className={`page-link py-2 px-4 rounded ${
                                                currentPage === 1
                                                    ? 'bg-gray-300 text-gray-600'
                                                    : 'bg-white text-orange-500 hover:bg-orange-200'
                                            }`}
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {Array.from({ length: Math.ceil(filteredBlogs.length / postsPerPage) }).map(
                                        (_, index) => (
                                            <li key={index} className="page-item">
                                                <button
                                                    onClick={() => paginate(index + 1)}
                                                    className={`page-link py-2 px-4 rounded ${
                                                        currentPage === index + 1
                                                            ? 'bg-orange-500 text-white'
                                                            : 'bg-white text-orange-500 hover:bg-orange-200'
                                                    }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        )
                                    )}
                                    <li className="page-item">
                                        <button
                                            onClick={nextPage}
                                            disabled={currentPage === Math.ceil(filteredBlogs.length / postsPerPage)}
                                            className={`page-link py-2 px-4 rounded ${
                                                currentPage === Math.ceil(filteredBlogs.length / postsPerPage)
                                                    ? 'bg-gray-300 text-gray-600'
                                                    : 'bg-white text-orange-500 hover:bg-orange-200'
                                            }`}
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="lg:w-1/4 ml-4">
                        <iframe
                            title="YouTube Video"
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/SqcY0GlETPk?si=HF_vflDAmaCzFh5S"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            ) : (
                <div>
                    {currentPosts.length > 0 ? (
                        <ul className="space-y-6">
                            {currentPosts.map((blog) => (
                                <li key={blog._id} className="bg-white rounded-lg p-6 shadow-md">
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={`/img/team-1.jpg`}
                                            alt="User"
                                            className="w-10 h-10 rounded-full mr-2"
                                        />
                                        <span className="text-gray-700">
                                            {authData.user ? `${authData.user.nom} ${authData.user.prenom}` : 'Static User'}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                                    <p className="text-gray-600">{blog.description}</p>
                                    <p className="text-gray-500 mt-2">
                                        Posted on {format(new Date(blog.date), 'MMMM dd, yyyy')}
                                    </p>
                                    <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                                        See More
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No blog posts available at the moment.</p>
                    )}

                    <div className="flex justify-center mt-4 border p-4 rounded-lg">
                        <nav>
                            <ul className="pagination flex space-x-2">
                                <li className="page-item">
                                    <button
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                        className={`page-link py-2 px-4 rounded ${
                                            currentPage === 1
                                                ? 'bg-gray-300 text-gray-600'
                                                : 'bg-white text-orange-500 hover:bg-orange-200'
                                        }`}
                                    >
                                        Previous
                                    </button>
                                </li>
                                {Array.from({ length: Math.ceil(filteredBlogs.length / postsPerPage) }).map(
                                    (_, index) => (
                                        <li key={index} className="page-item">
                                            <button
                                                onClick={() => paginate(index + 1)}
                                                className={`page-link py-2 px-4 rounded ${
                                                    currentPage === index + 1
                                                        ? 'bg-orange-500 text-white'
                                                        : 'bg-white text-orange-500 hover:bg-orange-200'
                                                }`}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    )
                                )}
                                <li className="page-item">
                                    <button
                                        onClick={nextPage}
                                        disabled={currentPage === Math.ceil(filteredBlogs.length / postsPerPage)}
                                        className={`page-link py-2 px-4 rounded ${
                                            currentPage === Math.ceil(filteredBlogs.length / postsPerPage)
                                                ? 'bg-gray-300 text-gray-600'
                                                : 'bg-white text-orange-500 hover:bg-orange-200'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}

            <div className="fixed bottom-4 right-4">
                <a
                    href="#"
                    onClick={handleToggleModal}
                    className="bg-orange-500 p-4 rounded-full text-white hover:bg-orange-600"
                    style={{ position: 'fixed', bottom: '20px', right: '20px' }}
                >
                    <FaCommentAlt size={24} />
                </a>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 max-w-2xl w-full rounded-md flex">
                        <div className="w-full">
                            <img
                                src="/img/blog-f.jpg" // Replace with the path to your image
                                alt="Blog Image"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                        <div className="w-full ml-4">
                            <h2 className="text-2xl font-semibold mb-4">Add a Blog</h2>
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleFormChange}
                                        className="mt-1 p-2 border rounded-md w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleFormChange}
                                        className="mt-1 p-2 border rounded-md w-full"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-600">
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        name="content"
                                        value={formData.content}
                                        onChange={handleFormChange}
                                        className="mt-1 p-2 border rounded-md w-full"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleToggleModal}
                                        className="mr-2 px-4 py-2 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-orange-500 rounded-md text-white hover:bg-orange-600"
                                    >
                                        Add Blog
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default BlogList;
