import React from "react";
import { useAppSelector } from "../../hooks/redux";
import cn from "classnames";
import styles from "./styles/UsersWidget.module.scss";
import { useAppDispatch } from "./../../hooks/redux";
import { fetchUsers } from "../../store/reducers/actionCreators/UsersActionCreators";
import { Preloader } from "../../components/common";
import { UserItem } from "./modules";
import { getUsers } from "../../store/selectors/UsersSliceSelectors";

const UsersWidget: React.FC = React.memo(() => {
  const users = useAppSelector((state) => getUsers(state));
  const { isLoading, error } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();
  const [usersQueryArgs, setUsersQueryArgs] = React.useState({
    key: "name",
    order: "asc",
  });

  React.useEffect(() => {
    setUsersQueryArgs({
      key: "email",
      order: "asc",
    });
    dispatch(fetchUsers(usersQueryArgs));
  }, []);

  return (
    <div className={cn(styles.users_widget)}>
      {isLoading && <Preloader />}
      {error && <h1>{error}</h1>}
      {users?.map((user) => {
        return <UserItem key={user.id} {...user} />;
      })}
    </div>
  );
});

export default UsersWidget;
