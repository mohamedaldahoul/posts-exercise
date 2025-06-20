import { FC, ChangeEvent, FormEvent, ReactNode } from 'react';

type FormData = {
  title: string;
  body: string;
  tags: string;
};

type Props = {
  formData: FormData;
  setFormData: (updater: (prev: FormData) => FormData) => void;
  onSubmit: (e: FormEvent) => void;
  loading: boolean;
  error: string | null;
  submitLabel: string;
  onClose: () => void;
  title: ReactNode;
};

const FormPost: FC<Props> = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  loading, 
  error, 
  submitLabel, 
  onClose, 
  title 
}) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label 
              htmlFor="title" 
              className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={formData.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                setFormData(prev => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>
          <div className="mb-3">
            <label 
              htmlFor="body" 
              className="block text-sm font-medium text-gray-700 mb-1">
                Body
              </label>
            <textarea
              id="body"
              name="body"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={formData.body}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
                setFormData(prev => ({ ...prev, body: e.target.value }))
              }
              required
              rows={6}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={formData.tags}
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                setFormData(prev => ({ ...prev, tags: e.target.value }))
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
            disabled={loading}
          >
            {loading ? 'Saving...' : submitLabel}
          </button>
          {error && <div className="mt-3 text-sm text-red-600 bg-red-100 border border-red-200 rounded px-3 py-2">
            {error}
          </div>}
        </form>
      </div>
    </div>
  );

export default FormPost;