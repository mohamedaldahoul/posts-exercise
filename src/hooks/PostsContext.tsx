import { FC, createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export type Post = {
   id?: number;
  title: string;
  body: string;
  tags: string[];
  userId?: number;
  views?: number;
  reactions?: {
    likes?: number;
    dislikes?: number;
  };
};

type PostsContextType = {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('useContext is not defined');
  }
  return context;
}; 