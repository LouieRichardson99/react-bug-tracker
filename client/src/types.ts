export interface FormValues {
  fullName?: string;
  email?: string;
  organisationName?: string;
  password?: string;
}

/* OnChangeErrorProps links to SignupForm */
export interface OnChangeErrorProps {
  password?: { message: string };
}

/* ResponseErrorProps links to each form */
export interface ResponseErrorProps {
  email?: { message: string };
  password?: { message: string };
}

/* PayloadProps passed into the setPayload function */
export interface PayloadProps {
  id: number;
  email: string;
  expiresAt: number;
}

/* Auth interfaces related to useAuth.ts */
export interface Auth {
  id: number | null;
  email: string | null;
  expiresAt: number | null;
}

export interface AuthState {
  auth: Auth | null;
  setAuth: (auth: Auth) => void;
  removeAuth: () => void;
}

/* Organisation interfaces related to useOrganisations.ts */
export interface Organisation {
  organisation_id: number;
  name: string;
  is_admin: number;
  projects: Project[];
}

export interface OrganisationState {
  organisations: Organisation[] | null;
  fetchOrganisations: () => void;
}

export interface Project {
  projectId: number;
  organisationId: number;
  name: string;
  bugs: Bug[];
}

export interface Bug {
  bugId: number;
  projectId: number;
  assignee: number | null;
  subject: string;
  description: string | null;
  dueDate: string | null;
  priority: string | null;
  status: string | null;
}

/* User interfaces related to useUser.ts */
export interface User {
  id: number;
  full_name: string;
  email: string;
  profile_image: string | null;
}

export interface UserState {
  user: User | null;
  fetchUser: () => void;
  removeUser: () => void;
}
