export interface User {
  userName: string;
}

export interface Comment {}

export interface Group {
  id: string;
  name: string;
  createdAt: string;
}

export interface Post {
  id: string;
  body: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  user: User;
  comments: Comment[];
  group: Group;
}
