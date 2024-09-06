import React from 'react';
import { Input, Modal, notification } from "antd";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setVideos } from '../../features/video/videoSlice';
import { RootState } from '../../store';
import { Video } from '../../types/Video.type';

const schema = z.object({
  videoName: z.string().min(1, 'Video name is required'),
  videoUrl: z.string().url('Invalid URL').min(1, 'Youtube URL is required'),
});

type FormData = z.infer<typeof schema>;

interface ManageVideoModalProps {
  existingVideo?: Video | null;
  isVisible: boolean;
  onClose: () => void;
}

const ManageVideoModal: React.FC<ManageVideoModalProps> = ({ existingVideo, isVisible = false, onClose }) => {
  const dispatch = useDispatch();
  const currentVideos = useSelector((state: RootState) => state.videos.list);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      videoName: existingVideo?.name || '',
      videoUrl: existingVideo?.url || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      let response: AxiosResponse<Video>;
      if (existingVideo?.id) {
        response = await axios.put(`${process.env.REACT_APP_API_URL}/api/video/${existingVideo.id}`, {
          name: data.videoName,
          url: data.videoUrl,
        });
        dispatch(setVideos(currentVideos.map(video => video.id === existingVideo.id ? response.data : video)));
      } else {
        response = await axios.post(`${process.env.REACT_APP_API_URL}/api/video`, {
          name: data.videoName,
          url: data.videoUrl,
        });
        dispatch(setVideos([response.data, ...currentVideos]));
      }
      onClose();
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.response?.data?.message || 'An error occurred while managing the video',
      });
    }
  };

  return (
    <Modal
      title="Add New Video"
      visible={isVisible}
      onOk={handleSubmit(onSubmit)}
      onCancel={onClose}
    >
      <form>
        <Controller
          name="videoName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Video Name"
              style={{ marginBottom: '10px' }}
            />
          )}
        />
        {errors.videoName && <p style={{ color: 'red' }}>{errors.videoName.message}</p>}
        
        <Controller
          name="videoUrl"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Video URL"
            />
          )}
        />
        {errors.videoUrl && <p style={{ color: 'red' }}>{errors.videoUrl.message}</p>}
      </form>
    </Modal>
  );
};

export default ManageVideoModal;
