export const fetchPostsURL = (currentSkip:number) => fetch(`https://dummyjson.com/posts?limit=20&skip=${currentSkip*20}`).then(res => res.json());

export const searchPostURL = (query: string) => fetch(`https://dummyjson.com/posts/search?q=${encodeURIComponent(query)}`).then(res => res.json());

export const savePostURL = (title: string, body: string, tags: string[], userId: number) =>
    fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            body,
            tags,
            userId,
        })});

export const updatePostURL = (id: number, title: string, body: string, tags: string[], userId?: number) =>
    fetch(`https://dummyjson.com/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            body,
            tags,
            userId,
        }),
    });

export const fetchSortedPostsURL = (currentSkip: number, sortBy: string, order: 'asc' | 'desc') =>
  fetch(`https://dummyjson.com/posts?limit=20&skip=${currentSkip*20}&sortBy=${sortBy}&order=${order}`)
    .then(res => res.json());

