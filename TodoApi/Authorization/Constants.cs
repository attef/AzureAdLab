using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Authorization
{
    public class Claims
    {
        public static string ObjectId = "http://schemas.microsoft.com/identity/claims/objectidentifier";
        public static string Scope = "http://schemas.microsoft.com/identity/claims/scope";
    }

    public class Scopes
    {
        public const string TodoReadAll = "Todo.ReadAll";
        public const string TodoRead = "Todo.Read";
        public const string TodoAdd= "Todo.Add";
    }

    public class AppRoles
    {
        public const string TodoReadAll = "Todo.Read.All";
        public const string TodoDeleteAll = "Todo.Delete.All";
    }
}
