import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Skeleton, message } from 'antd';

import { getNotices } from '../../actions/Notices';
import {getEvents} from '../../actions/Events'
import { getUser, updateUser } from '../../actions/Users';
import UserModules from '../module/UserModules';

function Dashboard() {
  const header = {
    paddingLeft: 10,
    fontFamily: 'Besley',
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 15,
  };

  const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '100px',
    textAlign: 'center',
    background: '#278ea5',
  };

  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const noticeData = useSelector((state) => state.NoticeReducer.notices);
  console.log(noticeData);
  const eventData = useSelector((state) => state.EventReducer.events);

  useEffect(() => {
    setLoading(true);
    dispatch(getNotices());
    dispatch(getEvents());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    getUserData(JSON.parse(localStorage.getItem('profile'))?.payload.user?._id);
  }, []);

  const getUserData = async (id) => {
    setLoading(true);
    const res = await dispatch(getUser(id));
    setUser(res);
    setLoading(false);
  };

  const unenroll = async (module) => {
    const newModules = user.modules.filter((mod) => mod.module._id !== module.key);
    setUser({ ...user, modules: newModules });
    const res = await dispatch(updateUser({ id: user._id, ...user, modules: newModules }));
    if (res.status === 200) {
      message.success('Unenrolled from the module');
    } else {
      message.error('An Error Occurred');
    }
  };
  return (
    <div>
      <h3 style={header}>DashBoard</h3>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-6">
              <h6>Notices</h6>
              <Carousel autoplay>
                {noticeData?.map((notice) => (
                  <div key={notice._id}>
                    <div style={contentStyle}>
                      <h3 style={{ color: 'white' }}>{notice.title}</h3>
                      <h6 style={{ color: 'white' }}>{notice.description}</h6>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="col-6">
            <h6>Events</h6>
              <Carousel autoplay>
                {eventData?.map((event) => (
                  <div key={event._id}>
                    <div style={contentStyle}>
                      <h3 style={{ color: 'white' }}>{event.title}</h3>
                      <h6 style={{ color: 'white' }}>{event.description}</h6>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div>
            <UserModules moduleFilter={user?.modules} unenroll={unenroll} />
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
