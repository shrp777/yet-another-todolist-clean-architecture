import { describe, test, expect, mock } from "bun:test";
import { CreateTask } from "@application/use-cases/CreateTask";
import { Task } from "@domain/entities/Task";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";

function createMockRepository(): ITaskRepository {
  return {
    create: mock(async (dto) => new Task(dto.content)),
    update: mock(),
    remove: mock(),
    findAll: mock(),
    findOneById: mock(),
  } as unknown as ITaskRepository;
}

describe("CreateTask Use Case", () => {
  test("calls repository.create and returns a TaskResponse", async () => {
    const repository = createMockRepository();
    const useCase = new CreateTask(repository);

    const result = await useCase.execute({ content: "New task" });

    expect(repository.create).toHaveBeenCalledWith({ content: "New task" });
    expect(result).toHaveProperty("id");
    expect(result.content).toBe("New task");
    expect(result.status).toBe("TODO");
  });
});
