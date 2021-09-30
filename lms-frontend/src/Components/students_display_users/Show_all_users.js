import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/Users";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import "./CardStyles.css";

import { Skeleton } from "antd";

let option_academic = [];

export const Show_all_users = () => {
  const dispatch = useDispatch();

  const [academic, setAcademic] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getUsers());
  }, [dispatch]);

  const academicData = useSelector((state) => state.UserReducer.users);
  console.log("all users", academicData);
  option_academic = academicData?.filter((user) => {
    return user.role === "Lab Instructor" || user.role === "Lecturer";
  });

  console.log("filter user", option_academic);

  useEffect(() => {
    setAcademic(option_academic);
    if (option_academic) {
      setLoading(false);
    }
  }, [academicData]);

  return (
    <div>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <div class="row container-lg mx-auto mt-5 px-0">
            <h1 className="display-5 text-center mb-5">Academic Staff</h1>
            {academic?.map((user) => {
              return <Card user={user} key={user._id} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

const Card = ({ user }) => {
  console.log(user);

  return (
    <div className={"col-sm-3"}>
      <div className="card">
        <div className="card-body">
          <img
            className="card-img"
            alt="user"
            src={`http://localhost:5000/${user.profile_photo}`}
          />
          <h5 className="card-title">{user.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
          <p className="card-text">{user.role}</p>
        </div>
      </div>
    </div>
  );
};
