export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  git_hub_link: string;
  email: string;
  linkedin_link: string;
  created_at: string;
  updated_at: string;
  is_admin: boolean;
  about_me?: string;
  projects?: Project[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  user?: User;
  project_techs?: ProjectTechs[];
  link: string;
  image_url?: string | null;
}

export interface Tech {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  image_url?: string;
  project_techs?: ProjectTechs[];
}

export interface ProjectTechs {
  project_id: number;
  techs_id: number;
  project?: Project;
  techs?: Tech;
}

export interface Pagination {
  page: number;
  total_per_page: number;
  total: number;
  total_pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}