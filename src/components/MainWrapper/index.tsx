import cn from "classnames";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { compose } from "redux";
import { withSuspense } from "../../hoc/WithSuspense";
import { SliderExample } from "../common";
import styles from "./styles/MainWrapper.module.scss";

const UsersWidget = React.lazy(() => import("../../widgets/UsersWidget"));
const PostsWidget = React.lazy(() => import("../../widgets/PostsWidget"));
const SuspendedUsersWidget = withSuspense(UsersWidget);
const SuspendedPostsWidget = withSuspense(PostsWidget);

const MainWrapper: React.FC = React.memo(() => {
  return (
    <div className={cn(styles.main_wrapper)}>
      <SliderExample />
      <Routes>
        <Route path="*" element={<div>404 NOT FOUND</div>} />
        <Route path="/" element={<SuspendedUsersWidget />} />
        <Route path="/posts" element={<SuspendedPostsWidget />} />
      </Routes>
    </div>
  );
});

export default compose<React.ComponentType>()(MainWrapper);
