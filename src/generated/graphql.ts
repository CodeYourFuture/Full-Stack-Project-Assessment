import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Like = {
  __typename?: 'Like';
  user_id: Scalars['String'];
  video_id: Scalars['String'];
  vote: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: User;
  addVideo: Video;
  vote: Like;
};


export type MutationAddVideoArgs = {
  video: VideoInput;
};


export type MutationVoteArgs = {
  userId: Scalars['String'];
  videoId: Scalars['String'];
  vote: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  userLikes: Array<Like>;
  video: Video;
  videos: Array<Video>;
};


export type QueryUserLikesArgs = {
  userId: Scalars['String'];
};


export type QueryVideoArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  likes?: Maybe<Array<UserLike>>;
};

export type UserLike = {
  __typename?: 'UserLike';
  created_at: Scalars['DateTime'];
  video_id: Scalars['String'];
  vote: Scalars['Float'];
};

export type Video = {
  __typename?: 'Video';
  created_by_id: Scalars['String'];
  id: Scalars['ID'];
  rating: Scalars['Float'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type VideoInput = {
  created_by_id: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type UserLikesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserLikesQuery = { __typename?: 'Query', userLikes: Array<{ __typename?: 'Like', video_id: string, vote: number }> };

export type AddLikeMutationVariables = Exact<{
  userId: Scalars['String'];
  videoId: Scalars['String'];
}>;


export type AddLikeMutation = { __typename?: 'Mutation', vote: { __typename?: 'Like', user_id: string, video_id: string, vote: number } };

export type AddDislikeMutationVariables = Exact<{
  userId: Scalars['String'];
  videoId: Scalars['String'];
}>;


export type AddDislikeMutation = { __typename?: 'Mutation', vote: { __typename?: 'Like', user_id: string, video_id: string, vote: number } };

export type RemoveVoteMutationVariables = Exact<{
  userId: Scalars['String'];
  videoId: Scalars['String'];
}>;


export type RemoveVoteMutation = { __typename?: 'Mutation', vote: { __typename?: 'Like', user_id: string, video_id: string, vote: number } };

export type AddUserMutationVariables = Exact<{ [key: string]: never; }>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', id: string } };

export type AddVideoMutationVariables = Exact<{
  video: VideoInput;
}>;


export type AddVideoMutation = { __typename?: 'Mutation', addVideo: { __typename?: 'Video', id: string, url: string, title: string, created_by_id: string, rating: number } };

export type VideosQueryVariables = Exact<{ [key: string]: never; }>;


export type VideosQuery = { __typename?: 'Query', videos: Array<{ __typename?: 'Video', id: string, url: string, title: string, created_by_id: string, rating: number }> };


export const UserLikesDocument = gql`
    query userLikes($userId: String!) {
  userLikes(userId: $userId) {
    video_id
    vote
  }
}
    `;
export const AddLikeDocument = gql`
    mutation addLike($userId: String!, $videoId: String!) {
  vote(userId: $userId, videoId: $videoId, vote: 1) {
    user_id
    video_id
    vote
  }
}
    `;
export const AddDislikeDocument = gql`
    mutation addDislike($userId: String!, $videoId: String!) {
  vote(userId: $userId, videoId: $videoId, vote: -1) {
    user_id
    video_id
    vote
  }
}
    `;
export const RemoveVoteDocument = gql`
    mutation removeVote($userId: String!, $videoId: String!) {
  vote(userId: $userId, videoId: $videoId, vote: 0) {
    user_id
    video_id
    vote
  }
}
    `;
export const AddUserDocument = gql`
    mutation addUser {
  addUser {
    id
  }
}
    `;
export const AddVideoDocument = gql`
    mutation addVideo($video: VideoInput!) {
  addVideo(video: $video) {
    id
    url
    title
    created_by_id
    rating
  }
}
    `;
export const VideosDocument = gql`
    query videos {
  videos {
    id
    url
    title
    created_by_id
    rating
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    userLikes(variables: UserLikesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserLikesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserLikesQuery>(UserLikesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userLikes', 'query');
    },
    addLike(variables: AddLikeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddLikeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddLikeMutation>(AddLikeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addLike', 'mutation');
    },
    addDislike(variables: AddDislikeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddDislikeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddDislikeMutation>(AddDislikeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addDislike', 'mutation');
    },
    removeVote(variables: RemoveVoteMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemoveVoteMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveVoteMutation>(RemoveVoteDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removeVote', 'mutation');
    },
    addUser(variables?: AddUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddUserMutation>(AddUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addUser', 'mutation');
    },
    addVideo(variables: AddVideoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddVideoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddVideoMutation>(AddVideoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addVideo', 'mutation');
    },
    videos(variables?: VideosQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VideosQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<VideosQuery>(VideosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'videos', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;