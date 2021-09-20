import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Skeleton } from 'antd';

import { getNotices } from '../../actions/Notices';

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
    background: '#364d79',
  };

  const dispatch = useDispatch();
  const [notice, setNotice] = useState([]);
  const [loading, setLoading] = useState(false);
  const noticeData = useSelector((state) => state.NoticeReducer.notices);

  useEffect(() => {
    setLoading(true);
    dispatch(getNotices());
    setLoading(false)
  }, [dispatch]);

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
        <Carousel autoplay>
          {noticeData?.map((notice) => (
            <div key={notice._id}>
              <h3 style={contentStyle}>
                {notice.title}
                <h6 style={{ color: 'white' }}>{notice.description}</h6>
              </h3>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default Dashboard;
