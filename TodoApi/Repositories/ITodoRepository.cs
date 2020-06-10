using System;
using System.Collections.Generic;
using TodoAPI.Models;

namespace TodoAPI.Repositories
{
    public interface ITodoRepository
    {
        IEnumerable<Todo> GetUserTodos(Guid userId);
        Todo CreateTodo(Guid userId, string title);
        IEnumerable<Todo> GetAllTodos();
        Todo GetUserTodo(Guid userId, Guid todoId);
        void DeleteTodos(IEnumerable<Guid> todoIds);
    }
}
