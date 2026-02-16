import type { TaskStatus } from "@domain/entities/TaskStatus";

export type CompleteTaskDTO = {
  id: string;
  content: string;
  status: TaskStatus;
};
