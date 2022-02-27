export interface User {
  userName: string;
}

export interface Comment {
  id: string;
  parent: string | null;
  text: string;
  createdAt: string;
  user: User;
}

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
