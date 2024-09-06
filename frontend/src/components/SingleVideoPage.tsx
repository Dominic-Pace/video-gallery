import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Spin, Alert, Card } from 'antd';
import { Video } from '../types/Video.type';

const { Title } = Typography;

const SingleVideoPage: React.FC = () => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { videoId } = useParams<{ videoId: string }>();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/video/${videoId}`);
        setVideo(response.data);
      } catch (err) {
        setError('Failed to fetch video by id');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;
  if (!video) return <Alert message="Video not found" type="warning" showIcon />;

  return (
    <Card>
      <Title level={2}>{video.name}</Title>
      <div style={{ position: 'relative', paddingBottom: '55%', height: 0, overflow: 'hidden' }}>
        <iframe
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          src={`https://www.youtube.com/embed/${video.url.split('v=')[1]}`}
          title={video.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Card>
  );
};

export default SingleVideoPage;
