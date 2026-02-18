import type { ITaskRepository } from "@application/ports/out/ITaskRepository";
import { CompleteTask } from "@application/use-cases/CompleteTask";
import { CreateTask } from "@application/use-cases/CreateTask";
import { FindTaskById } from "@application/use-cases/FindTaskById";
import { FindTasks } from "@application/use-cases/FindTasks";
import { StartTask } from "@application/use-cases/StartTask";
import { StopTask } from "@application/use-cases/StopTask";
import { ConsoleAdapter } from "@infrastructure/adapters/in/ConsoleAdapter";
import { InMemoryTaskRepository } from "@infrastructure/adapters/out/InMemoryTaskRepository";
import { MariaDBTaskRepository } from "@infrastructure/adapters/out/MariaDBTaskRepository";

let repository: ITaskRepository;

if (process.env.PERSISTENCE_TYPE === "MariaDB") {
  repository = new MariaDBTaskRepository();
} else {
  repository = new InMemoryTaskRepository();
}

//TODO: mettre en place un conteneur d'injection de dépendance
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
