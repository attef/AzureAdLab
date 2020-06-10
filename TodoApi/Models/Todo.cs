using System;

namespace TodoAPI.Models
{
    public class Todo
    {
        public string Title { get; set; }
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public DateTime CreatedOn { get; private set; }

        public Todo(Guid userId, string title)
        {
            UserId = userId;
            Title = title;
            CreatedOn = DateTime.Now;
            Id = Guid.NewGuid();
        }

    }
}
