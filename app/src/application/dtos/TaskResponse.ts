import type { TaskStatus } from "@domain/entities/TaskStatus";

export type TaskResponse = {
  id: string;
  content: string;
  status: TaskStatus;
};
