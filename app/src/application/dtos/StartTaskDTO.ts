import type { TaskStatus } from "@domain/entities/TaskStatus";

export type StartTaskDTO = {
  id: string;
  content: string;
  status: TaskStatus;
};
