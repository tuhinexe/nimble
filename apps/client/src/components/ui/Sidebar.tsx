import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <nav>
      <ul>
        <li>Dashboard</li>
        <li>Settings</li>
        <li>Profile</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default Sidebar;
