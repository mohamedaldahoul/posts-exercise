import React, { FC } from 'react'; 
import './App.css';
import { PostsList } from './components/posts-list';
import { PostsProvider } from './hooks/PostsContext';

const App: FC = () => {
  return (
    <PostsProvider>
      <div className="App">
        <PostsList />
      </div>
    </PostsProvider>
  );
}

export default App;
