export type TRole = 'admin' | 'user';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: TRole;
  address: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};

// Name, email, password, phone number, address.
