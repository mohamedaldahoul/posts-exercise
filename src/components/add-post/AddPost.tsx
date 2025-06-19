import React, {FC, useState} from 'react'
import { usePosts, Post } from '../../hooks/PostsContext'
import { FormPost } from '../form-post'
import { savePostURL } from '../resources'

const AddPost: FC = () => {
  const { setPosts } = usePosts();
  const [formData, setFormData] = useState<{ title: string; body: string; tags: string }>({ title: '', body: '', tags: '' });
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await savePostURL(
        formData.title,
        formData.body,
        formData.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
        1
      );

      if (!response.ok) throw new Error('Failed to add post');
      const newPost: Post = await response.json();
      setPosts(prev => [newPost, ...prev]);
      setFormData({ title: '', body: '', tags: '' });
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 pt-4">
      <button
        className="text-blue-600 hover:underline text-sm font-medium float-right mb-4"
        onClick={() => setOpen(true)}
      >
        ＋Add post
      </button>
      {open && (
        <FormPost
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddPost}
          loading={loading}
          error={error}
          submitLabel="Add Post"
          onClose={() => setOpen(false)}
          title="Add Post"
        />
      )}
    </div>
  )
}

export default AddPost