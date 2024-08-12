import { fireEvent, render, screen } from "../../test-utils";
import { expect, test } from "vitest";
import NoteApp from "../NoteApp";

function addNote(notes) {
  const inputTitle = screen.getByPlaceholderText(/Note Title/i);
  const inputDescription = screen.getByPlaceholderText(/Note Description/i);
  const button = screen.getByRole("button", { name: /Add New Note/i });

  notes.forEach((note) => {
    fireEvent.change(inputTitle, { target: { value: note.title } });
    fireEvent.change(inputDescription, {
      target: { value: note.description },
    });
    fireEvent.click(button);
  });
}

test("Note-App #1 : Input should be empty after the submit", () => {
  render(<NoteApp sort="latest" />);

  addNote([{ title: "Note one title", description: "Note one description" }]);
  const inputTitle = screen.getByPlaceholderText(/Note Title/i);

  expect(inputTitle.value).toBe("");
});

test("Note-App #2 : Should add multiple notes", () => {
  render(<NoteApp sort="latest" />);

  addNote([
    { title: "Note one title", description: "Note one description" },
    { title: "Note one title", description: "Note one description" },
    { title: "Note one title", description: "Note one description" },
  ]);
  const divElements = screen.getAllByText(/Note one title/i);
  expect(divElements.length).toBe(3);
});

test("Note-App #3 : Should not have active class in initial render", () => {
  render(<NoteApp sort="latest" />);

  addNote([{ title: "Note one title", description: "Note one description" }]);
  const divElement = screen.getByTestId("note-item");
  expect(divElement).not.toHaveClass("completed");
});

test("Note-App #4 : Should have active class when the button is clicked", () => {
  render(<NoteApp sort="latest" />);

  addNote([{ title: "Note one title", description: "Note one description" }]);

  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  const divElement = screen.getByTestId("note-item");

  expect(divElement).toHaveClass("completed");
});
