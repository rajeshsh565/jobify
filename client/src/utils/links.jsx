import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const links = [
  {
    path: ".",
    text: "add job",
    icon: <FaWpforms />,
  },
  {
    path: "all-jobs",
    text: "all jobs",
    icon: <MdQueryStats />,
  },
  {
    path: "profile",
    text: "profile",
    icon: <ImProfile />,
  },
  {
    path: "stats",
    text: "stats",
    icon: <MdQueryStats />,
  },
  {
    path: "admin",
    text: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default links;