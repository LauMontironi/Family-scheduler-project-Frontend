export interface Icard {
  full_name: string;
  relationship: string;
  is_child: boolean;
  birthdate: Date | null;
  gender: string;
  city: string;
  hobbys: string;
  email: string;
  password: string;
  is_admin: boolean;
}
