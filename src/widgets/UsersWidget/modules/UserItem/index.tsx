import React from "react";

const UserItem: React.FC<PropsType> = React.memo(({ name, email }) => {
  return (
    <div>
      <span>{name}</span>
      <span>{email}</span>
    </div>
  );
});

interface PropsType {
  id: string | number;
  name: string;
  email: string;
}

export default UserItem;
