import type { CreateTaskDTO } from "@application/dtos/CreateTaskDTO";
import type { UpdateTaskDTO } from "@application/dtos/UpdateTaskDTO";
import type { Task } from "@domain/entities/Task";

export interface ITaskRepository {
  create(task: CreateTaskDTO): Promise<Task>;
  update(task: UpdateTaskDTO): Promise<Task>;
  remove(taskId: string): Promise<boolean>;
  findAll(): Promise<Array<Task>>;
  findOneById(taskId: string): Promise<Task | null>;
}
