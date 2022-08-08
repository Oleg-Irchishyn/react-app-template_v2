import React from "react";
import cn from "classnames";
import styles from "./styles/PostsWidget.module.scss";
import { postsAPI } from "./../../services/PostServices";
import { PostItem } from "./modules";
import { Preloader } from "../../components/common";
import { Post } from "../../models/interfaces/Post.interface";

const PostsWidget: React.FC = React.memo(() => {
  const postQueryArgs = {
    start: 1,
    end: 100,
  };

  const {
    data: posts,
    error: getPostsError,
    isLoading: getPostsIsLoading,
  } = postsAPI.useFetchPostsQuery(postQueryArgs, {
    pollingInterval: 3600000,
  });

  const [createPost, { error: createPostError, isLoading: createPostIsLoading }] =
    postsAPI.useCreatePostMutation();
  const [updatePost, {}] = postsAPI.useUpdatePostMutation();
  const [deletePost, {}] = postsAPI.useDeletePostMutation();

  const handleCreatePost = async () => {
    const title = prompt();
    await createPost({ title, author: title } as Post);
  };

  const handleUpdatePost = (post: Post) => {
    updatePost(post);
  };

  const handleRemovePost = (post: Post) => {
    deletePost(post);
  };

  return (
    <div className={cn(styles.posts_widget)}>
      <button onClick={handleCreatePost}>Add Post</button>
      <>
        {getPostsIsLoading && <Preloader />}
        {createPostIsLoading && <Preloader />}
      </>
      <>
        {getPostsError && "status" in getPostsError ? <h1>{getPostsError.status}</h1> : null}
        {createPostError && "status" in createPostError ? <h1>{createPostError.status}</h1> : null}
      </>
      {posts?.map((post) => {
        return (
          <PostItem
            removePost={handleRemovePost}
            updatePost={handleUpdatePost}
            key={post.id}
            post={post}
          />
        );
      })}
    </div>
  );
});

export default PostsWidget;
