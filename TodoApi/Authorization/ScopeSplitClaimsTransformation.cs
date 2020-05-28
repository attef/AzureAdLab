using Microsoft.AspNetCore.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TodoApi.Authorization
{
    public class ScopeSplitClaimsTransformation : IClaimsTransformation
    {
        public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            var scopeClaim = principal.FindAll(Claims.Scope).ToArray();
            if(scopeClaim.Length != 1 || !scopeClaim[0].Value.Contains(' '))
            {
                return Task.FromResult(principal);
            }
            var splittedScopeClaims = scopeClaim[0].Value.Split(' ', StringSplitOptions.RemoveEmptyEntries)
                .Select(s => new Claim(Claims.Scope, s));

            return Task.FromResult(new ClaimsPrincipal(new ClaimsIdentity(principal.Identity, splittedScopeClaims)));
        }
    }
}
