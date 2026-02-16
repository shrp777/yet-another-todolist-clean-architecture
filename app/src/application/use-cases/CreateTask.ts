import type { CreateTaskDTO } from "@application/dtos/CreateTaskDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { ICreateTask } from "@application/ports/in/ICreateTask";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";
import { Task } from "@domain/entities/Task";

export class CreateTask implements ICreateTask {
  constructor(private readonly repository: ITaskRepository) {
    this.repository = repository;
  }
  async execute(taskDTO: CreateTaskDTO): Promise<TaskResponse> {
    const createdTask = await this.repository.create(taskDTO);
    return createdTask.toDTO();
  }
}
