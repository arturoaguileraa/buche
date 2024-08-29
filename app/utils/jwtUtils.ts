import { useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';

export interface ProfileData {
  email: string;
  name: string;
  image: string;
  roles: string;
  id: string;
}

export const useProfileData = (): ProfileData | null => {
  const { data: session } = useSession();
  
  if (!session || !session.accessToken) {
    return null;
  }

  try {
    const decodedToken = jwt.decode(session.accessToken as string);

    if (typeof decodedToken === 'string') {
      return JSON.parse(decodedToken) as ProfileData;
    } else {
      return decodedToken as ProfileData;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};