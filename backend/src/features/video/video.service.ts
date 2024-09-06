import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Video } from './video.entity';
import { CreateVideoDto, UpdateVideoDto } from './video.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
  ) {}

  create(createVideoDto: CreateVideoDto): Promise<Video> {
    const video = this.videosRepository.create(createVideoDto);
    return this.videosRepository.save(video);
  }

  findAll(options?: FindManyOptions<Video>): Promise<Video[]> {
    return this.videosRepository.find(options);
  }

  findOne(id: number): Promise<Video | null> {
    return this.videosRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.videosRepository.delete(id);
    return result.affected > 0;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto): Promise<Video> {
    const video = await this.findOne(id);
    if (!video) {
      throw new NotFoundException(`Video with ID ${id} not found`);
    }
    Object.assign(video, updateVideoDto);
    return this.videosRepository.save(video);
  }
}