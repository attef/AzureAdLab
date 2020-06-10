using System;
using System.Collections.Generic;
using System.Linq;
using TodoAPI.Models;

namespace TodoAPI.Repositories
{
    public class TodoMemoryRepository : ITodoRepository
    {
        private static readonly IList<Todo> Todos = new List<Todo>();

        public Todo CreateTodo(Guid userId, string title)
        {
            var todo = new Todo(userId, title);
            Todos.Add(todo);
            return todo;
        }

        public void DeleteTodos(IEnumerable<Guid> todoIds)
        {
            var todosToDelete = Todos.Where(todo => todoIds.Contains(todo.Id)).ToList();
            foreach (var todoToDelete in todosToDelete)
            {
                Todos.Remove(todoToDelete);
            }
        }

        public IEnumerable<Todo> GetAllTodos()
            => Todos;

        public Todo GetUserTodo(Guid userId, Guid todoId)
            => Todos.FirstOrDefault(t => t.UserId == userId && t.Id == todoId);

        public IEnumerable<Todo> GetUserTodos(Guid userId)
            => Todos.Where(t => t.UserId == userId);
    }
}
