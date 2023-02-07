import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

import ConfirmModal from '@/components/confirmation/ConfirmationModal';
import type { PostModel } from '@/types/models';

import { DEFAULT_URL } from '../hooks/API/users/useAPIUser';
import { getIdToken } from '../utils/cognito';
import { useUserCtx } from './UserCtx';

interface IPostContext {
  post: PostModel;
  toggleLike: () => void;
  addComment: (text: string) => void;
  removeComment: (commentId: number) => void;
  editComment: (commentId: number, text: string) => void;
}

const PostContext = createContext<IPostContext>({} as IPostContext);

interface IPostProviderProps {
  children: ReactNode;
  postId: number;
}

const usePostFromId = (postId: number) => {
  if (!postId) throw new Error('postId is undefined');

  const fetcher = async (url: string) => {
    const token = await getIdToken();

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    }

    return response.json();
  };

  const { data, error, isLoading } = useSWR<PostModel>(
    `/post/read/${postId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
    }
  );

  return { post: data, error, isLoading };
};

interface IPostModel extends PostModel {}

export const PostProvider = ({ children, postId }: IPostProviderProps) => {
  const { user } = useUserCtx();

  const { post, error, isLoading } = usePostFromId(postId);

  const [postValue, setPostValue] = useState<IPostModel>({} as IPostModel);

  const toggleLike = async () => {
    const isLike = postValue?.postLikes.some(
      (like) => like.userId === user?.id
    );

    if (!isLike) {
      const response = await fetch(`${DEFAULT_URL}/post/like/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await getIdToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('An error occurred while fetching the data.');
      } else {
        response.json().then((data) => {
          setPostValue({
            ...postValue,
            postLikes: [...postValue.postLikes, data],
          });
        });
      }
      return;
    }

    if (isLike) {
      const response = await fetch(`${DEFAULT_URL}/post/like/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${await getIdToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('An error occurred while fetching the data.');
      } else {
        response.json().then(() => {
          setPostValue({
            ...postValue,
            postLikes: postValue.postLikes.filter(
              (like) => like.userId !== user?.id
            ),
          });
        });
      }
    }
  };

  const addComment = async (comment: string) => {
    if (comment.length > 250) return;
    const response = await fetch(`${DEFAULT_URL}/post/comment/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getIdToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        text: comment,
      }),
    });
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    } else {
      response.json().then((data) => {
        setPostValue({
          ...postValue,
          postComments: [...postValue.postComments, data],
        });
      });
    }
  };

  const [showConfirm, setShowConfirm] = useState({
    show: false,
    onConfirm: () => {},
  });

  const removeCommentConfirmed = async (commentId: number) => {
    const response = await fetch(`${DEFAULT_URL}/post/comment/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${await getIdToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    } else {
      response.json().then(() => {
        setPostValue({
          ...postValue,
          postComments: postValue.postComments.filter(
            (comment) => comment.id !== commentId
          ),
        });
      });
    }
  };

  const removeComment = (commentId: number) => {
    setShowConfirm({
      show: true,
      onConfirm: () => removeCommentConfirmed(commentId),
    });
  };

  const editComment = async (commentId: number, text: string) => {
    if (text.length > 250) return;
    const response = await fetch(`${DEFAULT_URL}/post/comment/${commentId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${await getIdToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        id: commentId,
      }),
    });
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    } else {
      response.json().then((data) => {
        setPostValue({
          ...postValue,
          postComments: postValue.postComments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  text: data.text,
                }
              : comment
          ),
        });
      });
    }
  };

  useEffect(() => {
    if (post) setPostValue(post);
  }, [post]);

  if (error) throw new Error(error.message);

  if (isLoading) return <div>Loading...</div>;

  return (
    <PostContext.Provider
      value={{
        post: postValue,
        toggleLike,
        addComment,
        removeComment,
        editComment,
      }}
    >
      {children}

      <ConfirmModal
        show={showConfirm.show}
        onConfirm={showConfirm.onConfirm}
        onCancel={() => setShowConfirm({ show: false, onConfirm: () => {} })}
      />
    </PostContext.Provider>
  );
};

const usePostCtx = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePostCtx must be used within a PostProvider');
  }
  return context;
};

export { PostContext, usePostCtx };
