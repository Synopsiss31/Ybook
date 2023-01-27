import { getIdToken } from '@/lib/utils/cognito';
import { UserModel } from '@/types/models';
import useSWR from 'swr';

export const DEFAULT_URL = process.env.NEXT_PUBLIC_API_URL;

const useCreateUser = (user: UserCreation) => {

  const fetcher = async (url: string) => {
    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('An error occurred while creating the user.');
    }

    return response.json();
  };

  const { data, error,isLoading } = useSWR<UserModel>('/users', fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isLoading
  };
}

const useGetCurrentUser = () => {

  const fetcher = async (url: string) => {
    const idToken = await getIdToken();

    console.log("idToken", idToken);
    console.log(DEFAULT_URL+url);

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${idToken}`
      },
    });

    if (!response.ok) {
      throw new Error('An error occurred while fetching the user.');
    }

    return response.json();
  };

  const { data, error, isLoading } = useSWR<UserModel>(`/users/me/`, fetcher, {
    revalidateOnFocus: false,
  });


  return {
    data,
    error,
    isLoading
  };
}

const useReadUser = (filters: any) => {

  const fetcher = async (url: string) => {
    const idToken = await getIdToken();

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error("An error occurred while fetching the user.");
    }

    return response.json();
  };

  const { data, error, isLoading } = useSWR<UserModel[]>(`/users/read`, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

const useReadOneUser = (filters: any) => {


  const fetcher = async (url: string) => {
        const idToken = await getIdToken();

        const response = await fetch(`${DEFAULT_URL}${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          body: JSON.stringify(filters),
        });

    if (!response.ok) {
      throw new Error('An error occurred while fetching the user.');
    }
        
    return response.json();
  };

  const { data, error, isLoading } = useSWR<UserModel>(`/users/readOne`, fetcher, { revalidateOnFocus: false,});

  return {
    data,
    error,
    isLoading
  };
}

export { useCreateUser, useGetCurrentUser, useReadUser, useReadOneUser };
