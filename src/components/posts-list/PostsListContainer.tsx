import {FC, useEffect, useRef, useState, useCallback} from 'react'
import PostsList from './PostsList'
import { usePosts, Post } from '../../hooks/PostsContext'
import { SearchPost } from '../search-post'
import { fetchPostsURL, fetchSortedPostsURL, searchPostURL } from '../resources'

const PostsListContainer: FC = () => {
    const { posts, setPosts } = usePosts();
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState('');
    const [searching, setSearching] = useState(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined);
    const elementRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchPosts = useCallback(async (reset = false) => {
      const currentSkip = reset ? 0 : skip;
      if (sortOrder) {
        await fetchSortedPostsURL(currentSkip, 'title', sortOrder)
          .then(data => {
            if (data.posts.length === 0) {
              setHasMore(false);
              return;
            }
            if (reset) {
              setPosts(data.posts);
              setSkip(1);
            } else {
              setPosts((prevPosts) => [...prevPosts,  ...data.posts]);
              setSkip(prevPage => prevPage + 1);
            }
          })
          .catch(err => console.error('Error fetching sorted posts:', err));
      } else {
        await fetchPostsURL(currentSkip)
          .then(data => {
            if (data.posts.length === 0) {
              setHasMore(false);
              return;
            }
            if (reset) {
              setPosts(data.posts);
              setSkip(1);
            } else {
              setPosts((prevPosts) => [...prevPosts,  ...data.posts]);
              setSkip(prevPage => prevPage + 1);
            }
          })
          .catch(err => console.error('Error fetching posts:', err));
      }
    }, [skip, setHasMore, setPosts, sortOrder]);

    const fetchSearchPosts = useCallback(async (query: string) => {
      setSearching(true);
      await searchPostURL(query)
        .then(data => {
          setPosts(data.posts || []);
          setHasMore(false);
        })
        .catch(err => console.error('Error searching posts:', err))
        .finally(() => setSearching(false));
    }, [setPosts]);

    const onIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
      const initEntry = entries[0];
      if (initEntry.isIntersecting && hasMore && !search) {
        fetchPosts();
      }
    }, [hasMore, fetchPosts, search]);

    useEffect(() => {
      if (search) {
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(() => {
          fetchSearchPosts(search);
        }, 500); 
      } 
      if (!search && sortOrder) {
        fetchPosts(true);
       } // eslint-disable-next-line
    }, [search, sortOrder]);

    useEffect(() => {
      const observer = new IntersectionObserver(onIntersection);
      if (observer && elementRef.current) {
        observer.observe(elementRef.current);
      }
      return () => {
        if (observer) {
          observer.disconnect();
        }
      }
    }, [posts, onIntersection]);

    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md mb-2">
          <SearchPost
            search={search} 
            setSearch={setSearch} 
            searching={searching} 
          />
        </div>
        <div className="w-full max-w-md flex items-center gap-2">
          <select
            className="px-2 py-1 border border-gray-300 rounded text-sm"
            value={sortOrder || ''}
            onChange={e => 
              setSortOrder(e.target.value ? 
                (e.target.value as 'asc' | 'desc') 
                : undefined)}
            disabled={!!search}
            aria-label="Sort posts by title"
          >
            <option value="">Sort</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
        {(!search || !searching) && (
          <PostsList 
            posts={posts as Post[]}
            hasMore={hasMore && !search} 
            elementRef={elementRef}
          />
        )}
      </div>
    )
}

export default PostsListContainer