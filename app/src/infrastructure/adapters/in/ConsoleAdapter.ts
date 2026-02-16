import type { CreateTaskDTO } from "@application/dtos/CreateTaskDTO";
import type { StartTaskDTO } from "@application/dtos/StartTaskDTO";
import type { StopTaskDTO } from "@application/dtos/StopTaskDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { ICompleteTask } from "@application/ports/in/ICompleteTask";
import type { ICreateTask } from "@application/ports/in/ICreateTask";
import type { IFindTaskById } from "@application/ports/in/IFindTaskById";
import type { IFindTasks } from "@application/ports/in/IFindTasks";
import type { IStartTask } from "@application/ports/in/IStartTask";
import type { IStopTask } from "@application/ports/in/IStopTask";

export class ConsoleAdapter {
  constructor(
    private readonly createTaskUseCase: ICreateTask,
    private readonly completeTaskUseCase: ICompleteTask,
    private readonly startTaskUseCase: IStartTask,
    private readonly stopTaskUseCase: IStopTask,
    private readonly findTasksUseCase: IFindTasks,
    private readonly findTaskByIdUseCase: IFindTaskById
  ) {}

  exit(code: number = 1): void {
    process.exit(code);
  }

  async run(): Promise<void> {
    const action: string | undefined = process.argv[2];
    const arg: string | undefined = process.argv[3];

    if (!action) process.exit(0);

    switch (action) {
      case "create":
        if (!arg) {
          console.error("Missing task content");
        } else {
          const task: CreateTaskDTO = { content: arg };
          const createdTask: TaskResponse =
            await this.createTaskUseCase.execute(task);
          console.log(createdTask);
        }
        break;

      case "find-one":
        if (!arg) {
          console.error("Missing task id");
        } else {
          console.log(await this.findTaskByIdUseCase.execute(arg));
        }
        break;

      case "start":
        if (!arg) {
          console.error("Missing task id");
        } else {
          const existingTask: TaskResponse | null =
            await this.findTaskByIdUseCase.execute(arg);
          if (existingTask) {
            const startTaskDTO: StartTaskDTO = {
              id: existingTask.id,
              content: existingTask.content,
              status: existingTask.status
            };
            const startedTask = await this.startTaskUseCase.execute(startTaskDTO);
            console.log(startedTask);
          } else {
            console.error(`Task ${arg} not found`);
          }
        }
        break;

      case "stop":
        if (!arg) {
          console.error("Missing task id");
        } else {
          const existingTask: TaskResponse | null =
            await this.findTaskByIdUseCase.execute(arg);
          if (existingTask) {
            const stopTaskDTO: StopTaskDTO = {
              id: existingTask.id,
              content: existingTask.content,
              status: existingTask.status
            };
            const stoppedTask = await this.stopTaskUseCase.execute(stopTaskDTO);
            console.log(stoppedTask);
          } else {
            console.error(`Task ${arg} not found`);
          }
        }
        break;

      case "find-all":
        console.log(await this.findTasksUseCase.execute());
        break;

      default:
        this.exit(0);
        break;
    }
  }
}
