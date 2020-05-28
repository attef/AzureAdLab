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
        public IEnumerable<Todo> GetMyTodos()
        {
            var userId = GetUserId();
            return todoRepository.GetUserTodos(userId);
        }

        [HttpPost("add")]
        public Todo AddTodo(string title)
        {
            var userId = GetUserId();
            return todoRepository.CreateTodo(userId, title);
        }

        [HttpGet("read/{todoId}")]
        public ActionResult<Todo> GetTodo(Guid todoId)
        {
            var userId = GetUserId();
            return todoRepository.GetUserTodo(userId, todoId);
        }

        [HttpGet("all")]
        public ActionResult<IEnumerable<Todo>> GetAllTodos()
        {
            throw new NotImplementedException();
        }

        [HttpDelete("delete")]
        public ActionResult DeleteTodos([FromBody] IEnumerable<Guid> todoIds)
        {
            throw new NotImplementedException();
        }
    }
}
