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
