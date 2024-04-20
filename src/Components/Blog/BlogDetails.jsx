import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Importez Link depuis react-router-dom
import { format } from 'date-fns';
import { FaFacebook, FaTwitter, FaLinkedin, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import AuthenticationService from "@/Services/Authentification/AuthentificationService";
import { useAuth } from "@/pages/authContext";
import SimpleForm from './SimpleForm';  
import Chatbot from './ChatBot';
import './BlogDetails.css';


const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [validationError, setValidationError] = useState(null);
  const authenticationService = new AuthenticationService();
  const [author, setAuthor] = useState(null);
  const { authData } = useAuth();
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);
  const [currentSuggestedBlogIndex, setCurrentSuggestedBlogIndex] = useState(0);
  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`https://colabhub.onrender.com/blogs/${id}`);
      const blogData = response.data;
      setBlog(blogData);
      setComments(blogData.comments);
      const authorResponse = await authenticationService.getUserById(blogData.userId);
      setAuthor(authorResponse);
      // Fetch suggested blogs
      const suggestedResponse = await axios.get('https://colabhub.onrender.com/blogs/Blogs');
      // Filter suggested blogs based on the current blog's category
      const filteredSuggestedBlogs = suggestedResponse.data.filter(suggestedBlog => suggestedBlog.category === blogData.category && suggestedBlog._id !== id);
      setSuggestedBlogs(filteredSuggestedBlogs);
    } catch (error) {
      console.error('Error fetching blog details:', error);
      setError('Unable to fetch blog details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSuggestedBlogIndex(prevIndex => (prevIndex + 1) % suggestedBlogs.length);
    }, 5000); // Change blog every 5 seconds

    return () => clearTimeout(timer);
  }, [currentSuggestedBlogIndex, suggestedBlogs]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
    setValidationError(null);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setValidationError('Comment cannot be empty.');
      return;
    }
    try {
      const response = await axios.post(`https://colabhub.onrender.com/blogs/${id}/comments`, {
        text: newComment,
        userId: authData.user._id,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLike = async (commentId) => {
    // Implement the logic to handle liking a comment
    try {
      // Make a request to your backend to handle liking the comment
      const response = await axios.post(`https://colabhub.onrender.com/blogs/${id}/comments/${commentId}/like`, {
        userId: authData.user._id,
      });
      // Update the local state with the updated comment data
      const updatedComments = comments.map(comment =>
        comment._id === commentId ? response.data : comment
      );
      setComments(updatedComments);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleDislike = async (commentId) => {
    // Implement the logic to handle disliking a comment
    try {
      // Make a request to your backend to handle disliking the comment
      const response = await axios.post(`https://colabhub.onrender.com/blogs/${id}/comments/${commentId}/dislike`, {
        userId: authData.user._id,
      });
      // Update the local state with the updated comment data
      const updatedComments = comments.map(comment =>
        comment._id === commentId ? response.data : comment
      );
      setComments(updatedComments);
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`, '_blank');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blog-details-container p-10 mt-14 bg-gray-100">
      <div className="card bg-white p-6 mb-6 rounded-md shadow-md">
        <div className="flex items-center mb-4">
          <img
            src={author && author.picture ? `https://colabhub.onrender.com/images/${author.picture}` : '/img/team-1.jpg'}
            alt="Author" className="w-12 h-12 rounded-full mr-3 mt-2"
          />
       <span className="text-gray-800 font-semibold text-lg">{author ? `${author.nom} ${author.prenom}` : 'Loading author...'}</span>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-black-800">{blog.title}</h1>
      <p className="text-lg text-blue-800 mb-6">{blog.description}</p>
      <p className="text-lg text-gray-800 mb-10">{blog.content}</p>
      <p className="text-sm text-gray-600">Published on: {format(new Date(blog.date), 'MMMM dd, yyyy')}</p>
      </div>
  
      <div className="comments-section mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Comments</h2>
        {comments.length > 0 ? comments.map((comment) => (
          <div key={comment._id} className="bg-white p-6 mb-6 rounded-md shadow-md">
            <div className="flex items-center mb-4">
              <img
                src={comment.user && comment.user.picture ? `https://colabhub.onrender.com/images/${comment.user.picture}` : '/img/team-11.JPG'}
                alt="User" className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-gray-700 font-semibold">{comment.user ? `${comment.user.nom} ${comment.user.prenom}` : 'Idriss el bessi'}</span>
            </div>
            <p className="text-gray-800">{comment.text}</p>
            <div className="flex items-center mt-4">
            <button className="flex items-center text-blue-500 hover:underline mr-3 bg-white" onClick={() => handleLike(comment._id)}>
   <FaThumbsUp className="mr-1" /> 
  <span className="ml-1">Likes ({comment.likes ? comment.likes.length : 0})</span>
</button>
<button className="flex items-center text-red-500 hover:underline bg-white" onClick={() => handleDislike(comment._id)}>
  <FaThumbsDown className="mr-1" /> 
  <span className="ml-1">Dislikes ({comment.dislikes ? comment.dislikes.length : 0})</span>
</button>

            </div>
            <p className="text-gray-500 mt-2">Posted on: {format(new Date(comment.date), 'MMMM dd, yyyy')}</p>
          </div>
        )) : <p className="text-gray-800">No comments available.</p>}
        <form onSubmit={handleCommentSubmit} className="mt-8">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add your comment..."
            className="w-full p-3 border rounded-md"
          ></textarea>
          {validationError && <p className="text-red-500 mt-2">{validationError}</p>}
          <button type="submit" className="bg-orange-800 p-2 rounded-full text-white mt-4 hover:bg-orange-900">
            Add Comment
          </button>
        </form>
      </div>

      <div className="flex items-center space-x-4 mt-10">
        <button onClick={shareOnFacebook} className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
          <FaFacebook size={24} />
        </button>
        <button onClick={shareOnTwitter} className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600">
          <FaTwitter size={24} />
        </button>
        <button onClick={shareOnLinkedIn} className="bg-indigo-500 p-2 rounded-full text-white hover:bg-indigo-600">
          <FaLinkedin size={24} />
        </button>
      </div>

     
<div className="suggested-blogs-container mt-10">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Suggestions</h2>
  {/* Utilisez Link pour envelopper le contenu du blog suggéré */}
  <Link to={`/blog/${suggestedBlogs[currentSuggestedBlogIndex]._id}`} className="suggested-blog-card p-4 bg-white rounded-md shadow-md">
    <div className="suggested-blog-content">
      <h3 className="text-lg font-semibold">{suggestedBlogs[currentSuggestedBlogIndex].title}</h3>
      <p className="text-gray-700">{suggestedBlogs[currentSuggestedBlogIndex].description}</p>
      <p className="text-sm text-gray-500 mt-2">Published on: {format(new Date(suggestedBlogs[currentSuggestedBlogIndex].date), 'MMMM dd, yyyy')}</p>
    </div>
  </Link>
</div>


      <Chatbot />
    </div>
  );
};

export default BlogDetails;
