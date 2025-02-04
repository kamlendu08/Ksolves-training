// import React, { useState, useEffect } from "react";

import { useEffect, useState } from "react";

export const CommentSection = ({ data, comts, res }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  console.log(data);
  // Fetch comments for the blog
  useEffect(() => {
    // const fetchComments = async () => {
    try {
      //     const response = await fetch(
      //       `http://localhost:3000/api/comment/getcomments?blog_id=${blogId}`,
      //       {
      //         method: "GET",
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: `Bearer ${token}`,
      //         },
      //       }
      //     );
      //     const data = await response.json();
      setComments(buildCommentTree(comts)); // Transform flat comments into nested structure
      console.log("dff", comts)
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setIsLoading(false);
    }


    // fetchComments()
  }, [comts]);

  // Transform flat comments into a nested structure
  const buildCommentTree = (comments, parentId = null) => {
    return comments
      .filter((comment) => comment.parent_comment_id === parentId)
      .map((comment) => ({
        ...comment,
        replies: buildCommentTree(comments, comment.id),
      }));
  };

  // Handle reply submission
  const handleReply = async (parentCommentId, content) => {
    try {
      const response = await fetch("http://localhost:3000/api/comment/createcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          blog_id: data.id,
          user_id: parseInt(id), // Replace with actual user ID
          parent_comment_id: parentCommentId,
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post reply");
      }

      const newComment = await response.json();
      setComments((prevComments) => buildCommentTree([...prevComments, newComment])); // Update comments
      res((e) => e = !e)
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  // Render a single comment
  const Comment = ({ comment, onReply }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    const handleReplyClick = () => {
      if (replyContent.trim()) {
        onReply(comment.id, replyContent);
        setReplyContent("");
        setIsReplying(false);
      }
    };

    return (
      <div className="flex">
        <div className="w-0.5 mr-6 bg-gray-400"></div>
        <div>
          <div style={{ marginLeft: comment.parent_comment_id ? "20px" : "0" }}>
            <div>
              <div className="text-gray-500 font-bold">{comment.username}</div>
              <div className="p-2 bg-green-200 rounded rounded-2xl">{comment.content}</div>
              <button className="bg-green-300 cursor-pointer font-thin hover:bg-green-800 text-black text-[12px] border border-green-300 rounded-4xl px-2 mb-2" onClick={() => setIsReplying(!isReplying)}>Reply</button>
            </div>

            {isReplying && (
              <div>
                <textarea className="p-2 bg-gray-200 mx-2 mt-2 rounded-2xl"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                />
                <div>
                  <button className="bg-gray-300 cursor-pointer font-thin hover:bg-gray-800 text-black border border-gray-400 rounded-4xl px-2 ml-2" onClick={handleReplyClick}>Submit Reply</button>
                </div>
              </div>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div>
                {comment.replies.map((reply) => (
                  <Comment key={reply.id} comment={reply} onReply={onReply} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div>
      <div className="mt-2 font-bold text-xl">Comments</div>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onReply={handleReply} />
        ))
      )}
    </div>
  );
};

// export default CommentSection;
