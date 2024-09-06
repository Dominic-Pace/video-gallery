import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { VideosService } from './video.service';
import { CreateVideoDto, UpdateVideoDto } from './video.dto';

@Controller('api/video')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    const youtubeUrlPattern =
      /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$/;
    if (!youtubeUrlPattern.test(createVideoDto.url)) {
      throw new NotFoundException('Invalid YouTube URL format');
    }

    return this.videosService.create(createVideoDto);
  }

  @Get()
  findAll() {
    return this.videosService.findAll({ order: { createdAt: 'DESC' } });
  }

  @Get(':videoId')
  async findOne(@Param('videoId') videoId: string) {
    const video = await this.videosService.findOne(+videoId);
    if (!video) {
      throw new NotFoundException(`Video with ID ${videoId} not found`);
    }
    return video;
  }

  @Delete(':videoId')
  async remove(@Param('videoId') videoId: string) {
    const result = await this.videosService.remove(+videoId);
    if (!result) {
      throw new NotFoundException(`Video with ID ${videoId} not found`);
    }
    return { message: `Video with ID ${videoId} has been removed` };
  }

  @Put(':videoId')
  async update(@Param('videoId') videoId: string, @Body() updateVideoDto: UpdateVideoDto) {
    const updatedVideo = await this.videosService.update(+videoId, updateVideoDto);
    if (!updatedVideo) {
      throw new NotFoundException(`Video with ID ${videoId} not found`);
    }
    return updatedVideo;
  }
}
