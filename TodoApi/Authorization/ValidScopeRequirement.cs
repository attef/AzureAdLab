using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Authorization
{
    public class ValidScopeRequirement : IAuthorizationRequirement
    {
        public ValidScopeRequirement(string validScope)
        {
            ValideScope = validScope;
        }

        public string ValideScope { get; set; }
    }
}
