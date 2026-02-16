import type { CreateTaskDTO } from "@application/dtos/CreateTaskDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { ICreateTask } from "@application/ports/in/ICreateTask";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";

export class CreateTask implements ICreateTask {
  constructor(private readonly repository: ITaskRepository) {}

  async execute(taskDTO: CreateTaskDTO): Promise<TaskResponse> {
    const createdTask = await this.repository.create(taskDTO);
    return { id: createdTask.id, content: createdTask.content, status: createdTask.status };
  }
}
