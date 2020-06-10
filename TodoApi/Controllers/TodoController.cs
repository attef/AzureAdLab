using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {

        [HttpGet("myTodos")]
        public IEnumerable<Todo> GetMyTodos()
        {
            throw new NotImplementedException();
        }

        [HttpPost("add")]
        public Todo AddTodo(string title)
        {
            throw new NotImplementedException();
        }

        [HttpGet("read/{todoId}")]
        public ActionResult<Todo> GetTodo(Guid todoId)
        {
            throw new NotImplementedException();
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
