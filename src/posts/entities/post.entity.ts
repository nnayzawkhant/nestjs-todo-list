import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class Post {
  @ApiProperty({ example: 1, description: 'The unique identifier of the post' })
  id: number;

  @ApiProperty({ example: 'Post title', description: 'The title of the post' })
  title: string;

  @ApiProperty({ example: 'Category', description: 'The category of the post' })
  category: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'The image file of the post', required: false })
  image?: any;

  @ApiProperty({ example: 1, description: 'The user ID associated with the post' })
  userId: number;

}
