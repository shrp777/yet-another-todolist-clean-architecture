import { CompleteTask } from "@application/use-cases/CompleteTask";
import { CreateTask } from "@application/use-cases/CreateTask";
import { FindTaskById } from "@application/use-cases/FindTaskById";
import { FindTasks } from "@application/use-cases/FindTasks";
import { StartTask } from "@application/use-cases/StartTask";
import { StopTask } from "@application/use-cases/StopTask";
import { ConsoleAdapter } from "@infrastructure/adapters/in/ConsoleAdapter";
import { TaskRepository } from "@infrastructure/adapters/out/TaskRepository";

const repository = new TaskRepository();

const createTaskUseCase = new CreateTask(repository);
const completeTaskUseCase = new CompleteTask(repository);
const stopTaskUseCase = new StopTask(repository);
const startTaskUseCase = new StartTask(repository);
const findTasksUseCase = new FindTasks(repository);
const findTaskByIdUseCase = new FindTaskById(repository);

const application = new ConsoleAdapter(
  createTaskUseCase,
  completeTaskUseCase,
  startTaskUseCase,
  stopTaskUseCase,
  findTasksUseCase,
  findTaskByIdUseCase
);

application.run();
