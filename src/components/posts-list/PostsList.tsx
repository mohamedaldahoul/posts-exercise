import { FC, RefObject, useState } from 'react'
import { AddPost } from '../add-post';
import { EditPost } from '../edit-post';
import { Post } from '../../hooks/PostsContext';

type Props = {
  posts: Post[];
  hasMore: boolean;
  elementRef: RefObject<HTMLDivElement | null>;
};

const PostsList: FC<Props> = ({ posts, hasMore, elementRef }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post & { id: number } | null>(null);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 md:px-4 pb-0">
      <EditPost post={selectedPost} open={editOpen} onClose={() => setEditOpen(false)} />
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-xl font-semibold text-gray-800">Posts</h1>
          <AddPost />
        </div>
        <div className="space-y-3">
          {posts.map(post => (
            post.id !== undefined && (
              <div key={post.id} className="relative bg-white rounded-lg shadow p-4 flex flex-col gap-1">
                <button
                  className="absolute top-2 right-2 rounded border border-gray-300 bg-white hover:bg-gray-100 transition" 
                  aria-label="Edit post" 
                  onClick={() => { 
                    setSelectedPost(post as Post & { id: number }); 
                    setEditOpen(true); 
                  }}>
                    {/* 🖊️ */}
                    <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3873 4.08817C11.9129 4.61049 11.9129 5.45759 11.3873 5.98326L10.6708 6.69978L8.29688 4.32254L9.01339 3.60603C9.53572 3.08371 10.3828 3.08371 10.9085 3.60603L11.3873 4.08817ZM4.01451 8.57478L7.53683 5.08259L9.91406 7.45647L6.39174 10.9788C6.25446 11.1161 6.08036 11.2132 5.89286 11.26L3.88058 11.7656C3.69643 11.8092 3.50558 11.7556 3.37165 11.625C3.23806 11.4911 3.18482 11.2969 3.23036 11.0859L3.73326 9.10045C3.78013 8.91295 3.87723 8.74219 4.01451 8.57478ZM0 2.14286C0 0.959263 0.959263 0 2.14286 0H12.8571C14.0391 0 15 0.959263 15 2.14286V12.8571C15 14.0391 14.0391 15 12.8571 15H2.14286C0.959263 15 0 14.0391 0 12.8571V2.14286ZM1.60714 2.14286V12.8571C1.60714 13.1518 1.84687 13.3929 2.14286 13.3929H12.8571C13.1518 13.3929 13.3929 13.1518 13.3929 12.8571V2.14286C13.3929 1.84687 13.1518 1.60714 12.8571 1.60714H2.14286C1.84687 1.60714 1.60714 1.84687 1.60714 2.14286Z" fill="#83888F"/>
                    </svg>
                </button>
                <h2 className="font-semibold text-gray-800 text-base leading-tight mb-1 pr-6 text-left">{post.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-2 text-left">{post.body}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags && post.tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-100 text-xs text-gray-500 px-2 py-0.5 rounded">{capitalizeFirstLetter(tag)}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-2 pl-1 text-xs text-gray-400">
                  <span> 👁️ {post.views ?? 0} views</span>
                  {post.reactions && (
                    <span> 👍 {post.reactions.likes ?? 0} / 👎 {post.reactions.dislikes ?? 0}</span>
                  )}
                </div>
              </div>
            )
          ))}
        </div>
        {hasMore && <div ref={elementRef} className="text-center text-gray-400 py-4">Loading more posts...</div>}
      </div>
    </div>
  )
}

export default PostsList