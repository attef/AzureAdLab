using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using TodoApi.Authorization;
using TodoAPI.Models;
using TodoAPI.Repositories;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository todoRepository;

        private Guid GetUserId()
        {
            var claim = User.Claims.First(c => c.Type == Claims.ObjectId);
            return Guid.Parse(claim.Value);
        }


        public TodoController(ITodoRepository todoRepository)
        {
            this.todoRepository = todoRepository;
        }


        [HttpGet("myTodos")]
        [Authorize(Scopes.TodoReadAll)]
        public IEnumerable<Todo> GetMyTodos()
        {
            var userId = GetUserId();
            return todoRepository.GetUserTodos(userId);
        }

        [HttpPost("add")]
        [Authorize(Scopes.TodoAdd)]
        public Todo AddTodo(string title)
        {
            var userId = GetUserId();
            return todoRepository.CreateTodo(userId, title);
        }

        [HttpGet("read/{todoId}")]
        [Authorize(Scopes.TodoRead)]
        public ActionResult<Todo> GetTodo(Guid todoId)
        {
            var userId = GetUserId();
            return todoRepository.GetUserTodo(userId, todoId);
        }

        [HttpGet("all")]
        [Authorize(Roles = AppRoles.TodoReadAll)]
        public ActionResult<IEnumerable<Todo>> GetAllTodos()
        {
            return Ok(todoRepository.GetAllTodos());
        }

        [HttpDelete("delete")]
        [Authorize(Roles = AppRoles.TodoDeleteAll)]
        public ActionResult DeleteTodos([FromBody] IEnumerable<Guid> todoIds)
        {
            todoRepository.DeleteTodos(todoIds);
            return Ok();
        }
    }
}
