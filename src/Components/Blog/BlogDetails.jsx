import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import AuthenticationService from "@/Services/Authentification/AuthentificationService";

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

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`https://colabhub.onrender.com/blogs/${id}`);
      const blogData = response.data;
      setBlog(blogData);
      setComments(blogData.comments);
      const authorResponse = await authenticationService.getUserById(blogData.userId);
      setAuthor(authorResponse);
    } catch (error) {
      console.error('Error fetching blog details:', error);
      setError('Unable to fetch blog details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`, '_blank');
  };

  return (
    <div className="blog-details-container p-20 mt-10">
      <div className="flex items-center mb-4">
        <img 
          src={author && author.picture ? `https://colabhub.onrender.com/images/${author.picture}` : '/img/team-1.jpg'}
          alt="Author" className="w-10 h-10 rounded-full mr-2 mt-6" />
        <span className="text-gray-900 mt-5">{author ? `${author.nom} ${author.prenom}` : 'Loading author...'}</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
      <p className="text-gray-600 mb-6">{blog.description}</p>
      <p className="text-gray-900 mb-9">{blog.content}</p>
      <p className="text-gray-500">Published on: {format(new Date(blog.date), 'MMMM dd, yyyy')}</p>

      <div className="comments-section mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {comments.length > 0 ? comments.map((comment) => (
          <div key={comment._id} className="bg-white p-4 mb-4 rounded-md shadow-md">
            <div className="flex items-center mb-2">
              <img 
                src={comment.user && comment.user.picture ? `https://colabhub.onrender.com/images/${comment.user.picture}` : '/img/team-1.jpg'}
                alt="User" className="w-8 h-8 rounded-full mr-2" />
              <span className="text-gray-700">{comment.user ? `${comment.user.nom} ${comment.user.prenom}` : 'Loading user...'}</span>
            </div>
            <p className="text-gray-700">{comment.text}</p>
            <p className="text-gray-500 mt-2">Posted on: {format(new Date(comment.date), 'MMMM dd, yyyy')}</p>
          </div>
        )) : <p>No comments available.</p>}

        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea value={newComment} onChange={handleCommentChange} placeholder="Add your comment..." className="w-full p-2 border rounded-md"></textarea>
          {validationError && <p className="text-red-500 mt-2">{validationError}</p>}
          <button type="submit" className="bg-orange-500 p-2 rounded-full text-white mt-2 hover:bg-blue-600">Add Comment</button>
        </form>
      </div>

      <div className="flex items-center space-x-4 mt-8">
        <button onClick={shareOnFacebook} className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600"><FaFacebook size={24} /></button>
        <button onClick={shareOnTwitter} className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600"><FaTwitter size={24} /></button>
        <button onClick={shareOnLinkedIn} className="bg-indigo-500 p-2 rounded-full text-white hover:bg-indigo-600"><FaLinkedin size={24} /></button>
      </div>
    </div>
  );
};

export default BlogDetails;
