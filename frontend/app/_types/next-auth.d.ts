import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by useSession, getSession and received as a prop on the SessionProvider React Context
   */
  export interface Session {
    accessToken: string & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the jwt callback and getToken, when using JWT sessions */
  export interface JWT {
    accessToken: string;
  }
}