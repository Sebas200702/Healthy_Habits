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

export type Messages = Array<Message>;
