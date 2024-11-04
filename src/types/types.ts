export type Sesion = {
  user: {
    name: string;
    image: string;
    email: string;
  };
};

export type Pathname = string;

export type Link = {
  title: string;
  href: string;
  icon: any;
  active: boolean;
};
export type Message = {
  role: string;
  content: string;
  time?: string;
  userName: string | undefined;
};
export type Target = {
  title?: string;
  description?: string;
  completed?: boolean;
  userName?: string | undefined;
  time?: string;
  target_id?: string;
};

export type Messages = Array<Message>;
