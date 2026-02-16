import type { TaskStatus } from "@domain/entities/TaskStatus";

export type UpdateTaskDTO = {
  id: string;
  content: string;
  status: TaskStatus;
};
