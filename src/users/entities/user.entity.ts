import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/entities/post.entity';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ type: () => [Post], description: 'The posts of the user' })
  posts: Post[];

}
