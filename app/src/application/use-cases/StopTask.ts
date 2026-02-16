import type { TaskByIdDTO } from "@application/dtos/TaskByIdDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { UpdateTaskDTO } from "@application/dtos/UpdateTaskDTO";
import type { IStopTask } from "@application/ports/in/IStopTask";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";
import type { Task } from "@domain/entities/Task";

export class StopTask implements IStopTask {
  constructor(private readonly repository: ITaskRepository) {}

  async execute(task: TaskByIdDTO): Promise<TaskResponse> {
    const foundTask: Task | null = await this.repository.findOneById(task.id);
    if (foundTask) {
      foundTask.stop();
      const dto: UpdateTaskDTO = {
        id: foundTask.id,
        status: foundTask.status,
        content: foundTask.content
      };
      const updatedTask = await this.repository.update(dto);
      return { id: updatedTask.id, content: updatedTask.content, status: updatedTask.status };
    } else {
      throw Error(`Task ${task.id} not found`);
    }
  }
}
