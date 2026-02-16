import type { TaskStatus } from "@domain/entities/TaskStatus";

export type StopTaskDTO = {
  id: string;
  content: string;
  status: TaskStatus;
};
