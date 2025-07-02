export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'no-status';

export interface TaskStatusConfig {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export interface TaskFilters {
  status?: TaskStatus;
  completed?: boolean;
  search?: string;
}