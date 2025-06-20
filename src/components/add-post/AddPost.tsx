import {FC, useState} from 'react'
import { usePosts, Post } from '../../hooks/PostsContext'
import { FormPost } from '../form-post'
import { savePostURL } from '../resources'

const AddPost: FC = () => {
  const { setPosts } = usePosts();
  const [formData, setFormData] = useState<{ title: string; body: string; tags: string }>({ title: '', body: '', tags: '' });
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
      setIsOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className="text-[#3679FF] hover:underline text-sm font-medium"
        onClick={() => setIsOpen(true)}
      >
        ＋Add post
      </button>
      {isOpen && (
        <FormPost
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddPost}
          loading={isLoading}
          error={error}
          submitLabel="Add Post"
          onClose={() => setIsOpen(false)}
          title="Add Post"
        />
      )}
    </div>
  )
}

export default AddPost