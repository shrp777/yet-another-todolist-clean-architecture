import { describe, test, expect } from "bun:test";
import { Task } from "@domain/entities/Task";

describe("Task Entity", () => {
  describe("constructor", () => {
    test("creates a task with TODO status by default and generates a UUID", () => {
      const task = new Task("Buy groceries");

      expect(task.content).toBe("Buy groceries");
      expect(task.status).toBe("TODO");
      expect(task.id).toBeDefined();
      expect(typeof task.id).toBe("string");
    });

    test("throws if content is empty", () => {
      expect(() => new Task("")).toThrow("Task content must be completed");
    });
  });

  describe("markAsCompleted", () => {
    test("TODO -> DONE", () => {
      const task = new Task("Do laundry");
      task.markAsCompleted();
      expect(task.status).toBe("DONE");
    });

    test("DOING -> DONE", () => {
      const task = new Task("Do laundry", "DOING");
      task.markAsCompleted();
      expect(task.status).toBe("DONE");
    });

    test("DONE -> throws", () => {
      const task = new Task("Do laundry", "DONE");
      expect(() => task.markAsCompleted()).toThrow("Task is already done.");
    });
  });

  describe("start", () => {
    test("TODO -> DOING", () => {
      const task = new Task("Clean room");
      task.start();
      expect(task.status).toBe("DOING");
    });

    test("DOING -> throws", () => {
      const task = new Task("Clean room", "DOING");
      expect(() => task.start()).toThrow("Task is already doing.");
    });

    test("DONE -> throws", () => {
      const task = new Task("Clean room", "DONE");
      expect(() => task.start()).toThrow("Task is already done.");
    });
  });

  describe("stop", () => {
    test("DOING -> TODO", () => {
      const task = new Task("Read book", "DOING");
      task.stop();
      expect(task.status).toBe("TODO");
    });

    test("TODO -> throws", () => {
      const task = new Task("Read book");
      expect(() => task.stop()).toThrow("Task is not started.");
    });

    test("DONE -> throws", () => {
      const task = new Task("Read book", "DONE");
      expect(() => task.stop()).toThrow("Task is already done.");
    });
  });

  describe("toDTO", () => {
    test("returns the correct format { id, content, status }", () => {
      const task = new Task("Write tests");
      const dto = task.toDTO();

      expect(dto).toEqual({
        id: task.id,
        content: "Write tests",
        status: "TODO",
      });
    });
  });
});
