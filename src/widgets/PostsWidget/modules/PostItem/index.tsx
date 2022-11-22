import React from "react";
import { Post } from "../../../../models/interfaces/Post.interface";

const PostItem: React.FC<PropsType> = React.memo(({ updatePost, removePost, post }) => {
  const { title, author } = post;

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removePost(post);
  };

  const handleUpdate = (e: React.MouseEvent) => {
    const title = prompt() || "";
    updatePost({ ...post, title });
  };
  return (
    <div onClick={handleUpdate}>
      <span style={{marginRight: '5px'}}>{title}</span>
      <span style={{marginRight: '5px'}}>{author}</span>
      <button onClick={handleRemove}>Delete Post</button>
    </div>
  );
});

interface PropsType {
  post: Post;
  updatePost: (post: Post) => void;
  removePost: (post: Post) => void;
}

export default PostItem;
