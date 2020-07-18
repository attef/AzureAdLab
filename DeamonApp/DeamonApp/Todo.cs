using System;

namespace DeamonApp
{
    partial class Program
    {
        public class Todo
        {
            public string Title { get; set; }
            public Guid Id { get; set; }
            public Guid UserId { get; set; }
            public DateTime CreatedOn { get; set; }
        }
    }
}
