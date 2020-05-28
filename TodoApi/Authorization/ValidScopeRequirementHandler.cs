using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Authorization
{
    public class ValidScopeRequirementHandler : AuthorizationHandler<ValidScopeRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, 
            ValidScopeRequirement requirement)
        {
            if(context.User.HasClaim(c => c.Type == Claims.Scope) &&
                context.User.FindAll(c => c.Type == Claims.Scope).Any(c => c.Value == requirement.ValideScope))
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
