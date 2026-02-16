import { describe, test, expect, mock } from "bun:test";
import { FindTasks } from "@application/use-cases/FindTasks";
import { Task } from "@domain/entities/Task";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";

function createMockRepository(tasks: Task[] = []): ITaskRepository {
  return {
    create: mock(),
    update: mock(),
    remove: mock(),
    findAll: mock(async () => tasks),
    findOneById: mock(),
  } as unknown as ITaskRepository;
}

describe("FindTasks Use Case", () => {
  test("calls repository.findAll and returns an array of TaskResponse", async () => {
    const tasks = [new Task("Task 1"), new Task("Task 2")];
    const repository = createMockRepository(tasks);
    const useCase = new FindTasks(repository);

    const result = await useCase.execute();

    expect(repository.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0]!.content).toBe("Task 1");
    expect(result[1]!.content).toBe("Task 2");
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("status");
  });

  test("returns an empty array when no tasks exist", async () => {
    const repository = createMockRepository([]);
    const useCase = new FindTasks(repository);

    const result = await useCase.execute();

    expect(result).toEqual([]);
  });
});
