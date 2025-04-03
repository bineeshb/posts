export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export type GetPostsQParams = Partial<{
  limit: number;
  skip: number;
  select: string[];
  sortBy: keyof Post;
  order: 'asc' | 'desc';
}>;

export interface PostsList {
  limit: number;
  skip: number;
  total: number;
  posts: Post[];
}
