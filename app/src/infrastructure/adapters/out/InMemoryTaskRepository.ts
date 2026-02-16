import type { CreateTaskDTO } from "@application/dtos/CreateTaskDTO";
import type { UpdateTaskDTO } from "@application/dtos/UpdateTaskDTO";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";
import { Task } from "@domain/entities/Task";

export class InMemoryTaskRepository implements ITaskRepository {
  private data: Array<Task> = [];

  async create(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const task = new Task(createTaskDTO.content, "TODO");
    this.data.push(task);
    return task;
  }

  async update(updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    const existingTask: Task | undefined = this.data.find(
      (t) => t.id === updateTaskDTO.id
    );

    if (!existingTask) {
      throw new Error(`Task ${updateTaskDTO.id} not found`);
    } else {
      existingTask.content = updateTaskDTO.content;
      existingTask.status = updateTaskDTO.status;

      this.data = this.data.map((t: Task) =>
        t.id === updateTaskDTO.id ? existingTask : t
      );
    }

    return existingTask;
  }

  async remove(taskId: string): Promise<boolean> {
    this.data = this.data.filter((task) => task.id !== taskId);
    return true;
  }

  async findAll(): Promise<Array<Task>> {
    return this.data;
  }

  async findOneById(taskId: string): Promise<Task | null> {
    const existingTask = this.data.find((task) => task.id === taskId);
    return existingTask !== undefined ? existingTask : null;
  }
}
