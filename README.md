# Vue Todo App

A modern, responsive todo application built with Vue 3, TypeScript, and Tailwind CSS. Features a clean interface with board and list views, task filtering, and local storage persistence.

## Tech Stack

- **Frontend**: Vue 3 with Composition API
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Build Tool**: Vite for fast development and building
- **Containerization**: Docker for easy deployment

## Quick Demo

Try the app instantly with Docker:

```bash
# Pull the latest image
docker pull wasaru/project-todo-app:latest

# Run the container
docker run -d -p 3000:80 wasaru/project-todo-app:latest
```

Then open your browser and go to: **http://localhost:3000**

## Usage

1. **Add Tasks**: Click "New Task" to create a todo item
2. **Edit Tasks**: Click the edit icon on any task
3. **Toggle Status**: Use the checkbox to mark tasks complete
4. **Filter Tasks**: Use status buttons to filter by completion state
5. **Search**: Use the search bar to find specific tasks
6. **Switch Views**: Toggle between board and list layouts

