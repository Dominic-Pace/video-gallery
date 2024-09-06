import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { List, Card, Typography, Spin, Alert, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import AddVideoModal from './ManageVideoModal';
import { RootState, AppDispatch } from '../../store';
import { setVideos, setLoading, setError } from '../../features/video/videoSlice';
import { Video } from '../../types/Video.type';

const { Title } = Typography;

const Gallery: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVideoInfo, setEditingVideoInfo] = useState<Video | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  
  const { list: videos, loading, error } = useSelector((state: RootState) => state.videos);

  useEffect(() => {
    const fetchVideos = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/video`);
        dispatch(setVideos(response.data));
      } catch (err) {
        dispatch(setError('Failed to fetch videos'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchVideos();
  }, [dispatch]);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleEdit = (video: Video) => {
    setEditingVideoInfo(video);
    setIsModalVisible(true);
  };

  const handleDelete = (videoId: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this video?',
      onOk: async () => {
        try {
          await axios.delete(`${process.env.REACT_APP_API_URL}/api/video/${videoId}`);
          dispatch(setVideos(videos.filter(v => v.id !== videoId)));
        } catch (err) {
          dispatch(setError('Failed to delete video'));
        }
      },
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Title level={2}>Video Gallery</Title>
        <Button type="primary" onClick={showModal}>
          Add Video
        </Button>
      </div>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={videos}
        renderItem={(video) => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt={video.name} src={`https://img.youtube.com/vi/${video.url.split('v=')[1]}/mqdefault.jpg`} />}
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit(video)} />,
                <DeleteOutlined key="delete" onClick={() => handleDelete(video.id)} />,
              ]}
            >
              <Link to={`/${video.id}`}>
                <Card.Meta title={video.name} />
              </Link>
            </Card>
          </List.Item>
        )}
      />
      <AddVideoModal 
        isVisible={isModalVisible} 
        onClose={() => {
          setIsModalVisible(false);
          setEditingVideoInfo(null);
        }}
        existingVideo={editingVideoInfo}
      />
    </div>
  );
};

export default Gallery;