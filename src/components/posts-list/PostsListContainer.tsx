import {FC, useEffect, useRef, useState, useCallback} from 'react'
import PostsList from './PostsList'
import { usePosts, Post } from '../../hooks/PostsContext'
import { SearchPost } from '../search-post'
import { fetchPostsURL, searchPostURL } from '../resources'

const PostsListContainer: FC = () => {
    const { posts, setPosts } = usePosts();
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(undefined);
    const elementRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const fetchPosts = async (skip = 0, isReset = false) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const data = await fetchPostsURL(
          skip, 
          sortOrder ? 'title' : undefined, 
          sortOrder
        );
        if (!data.posts || data.posts.length === 0) {
          setHasMore(false);
          return;
        }
        if (isReset) {
          setPosts(data.posts);
          setSkip(1);
        } else {
          setPosts(prev => [...prev, ...data.posts]);
          setSkip(prev => prev + 1);
        }
        setHasMore(data.posts.length === 20);
      } catch (error) {
        console.error('Error loading posts:', error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    const performSearch = async (query: string) => {
      if (query.length <= 1) return;

      setIsSearching(true);
      try {
        const data = await searchPostURL(query);
        setPosts(data.posts || []);
        setHasMore(false);
      } catch (error) {
        console.error('Error searching posts:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const resetPosts = () => {
      setSkip(0);
      setHasMore(true);
      fetchPosts(0, true);
    };

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !search && !isLoading) {
        fetchPosts(skip);
      } // eslint-disable-next-line
    }, [hasMore, search, isLoading, skip]);

    useEffect(() => {
      if (!isInitialized) {
        setIsInitialized(true);
        resetPosts();
      } // eslint-disable-next-line
    }, []);

    useEffect(() => {
      if (!isInitialized) return;
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      if (search.trim()) {
        searchTimeout.current = setTimeout(() => {
          performSearch(search);
        }, 500);
      } else {
        resetPosts();
      }
      return () => {
        if (searchTimeout.current) {
          clearTimeout(searchTimeout.current);
        }
      }; // eslint-disable-next-line
    }, [search, isInitialized]);

    useEffect(() => {
      if (!isInitialized || search.trim()) return;
      resetPosts();
      // eslint-disable-next-line
    }, [sortOrder, isInitialized]);

    useEffect(() => {
      const observer = new IntersectionObserver(handleIntersection);
      if (elementRef.current) {
        observer.observe(elementRef.current);
      }
      return () => observer.disconnect();
    }, [handleIntersection]);

    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md mb-2">
          <SearchPost
            search={search} 
            setSearch={setSearch} 
            searching={isSearching} 
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
        {(!search || !isSearching) && (
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