import { FC, useState, useEffect, FormEvent } from 'react'
import { usePosts } from '../../hooks/PostsContext'
import { FormPost } from '../form-post'
import { updatePostURL } from '../resources'

type Props = {
  post: {
    id: number;
    title: string;
    body: string;
    tags: string[];
    userId?: number;
  } | null;
  onClose: () => void;
  open: boolean;
};

const EditPost: FC<Props> = ({ post, onClose, open }) => {
  const { setPosts } = usePosts();
  const [form, setForm] = useState({ title: post?.title || '', body: post?.body || '', tags: post?.tags.join(', ') || '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      setForm({ 
        title: post.title, 
        body: post.body, 
        tags: post.tags.join(', '), 
      });
    }
  }, [post]);

  if (!open || !post) return null;

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await updatePostURL(
        post.id,
        form.title,
        form.body,
        form.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
        post?.userId
      );
      
      if (!response.ok) throw new Error('Failed to update post');
      const updatedPost = await response.json();
      setPosts(prevPosts => prevPosts.map(p => p.id === updatedPost.id ? { ...p, ...updatedPost } : p));
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Failed to update post');
    }
  };

  return (
    <FormPost
      formData={form}
      setFormData={setForm}
      onSubmit={handleSave}
      loading={isLoading}
      error={error}
      submitLabel="Save Changes"
      onClose={onClose}
      title="Edit Post"
    />
  );
}

export default EditPost;