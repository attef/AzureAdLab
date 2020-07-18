using Microsoft.Identity.Client;
using Newtonsoft.Json;
using System;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace DeamonApp
{
    partial class Program
    {
        static void Main(string[] args)
        {
            var from = DateTime.ParseExact(args[0], "g", new CultureInfo("fr-FR"));
            PurgeOldTodosAsync(from).GetAwaiter().GetResult();
            Console.WriteLine("Hello World!");
        }

        public static async Task PurgeOldTodosAsync(DateTime from)
        {
            string clientId = "9ca1f0ab-974e-4194-ab49-d9753c47c73f";
            Uri authority = new Uri("https://login.microsoftonline.com/8240eed4-15d9-4e26-b437-49d30ac61009");
            var certificate = new X509Certificate2(@"D:\Demos\DeamonApp\DeamonApp\certificats\mycert.pfx", "test123");
            var app = ConfidentialClientApplicationBuilder
                .Create(clientId)
                .WithAuthority(authority)
                .WithCertificate(certificate)
                .Build();
            var scopes = new[] { "api://4dbf2a2e-197e-4e51-8cb2-2fcd27554aa3/.default" };
            try
            {
                var result = await app.AcquireTokenForClient(scopes).ExecuteAsync();
                Console.WriteLine(result.AccessToken);
                var httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", result.AccessToken);
                var response = await httpClient.GetAsync("https://localhost:5001/todo/all");
                var content = await response.Content.ReadAsStringAsync();
                var todos = JsonConvert.DeserializeObject<Todo[]>(content);
                var todosTodDelete = todos.Where(t => t.CreatedOn <= from).Select(t => t.Id).ToList();
                var deleteRequest = new HttpRequestMessage
                {
                    Content = new StringContent(JsonConvert.SerializeObject(todosTodDelete), Encoding.UTF8, "application/json"),
                    Method = HttpMethod.Delete,
                    RequestUri = new Uri("https://localhost:5001/todo/delete")
                };
                var deleteResponse = await httpClient.SendAsync(deleteRequest);
                deleteResponse.EnsureSuccessStatusCode();
                Console.WriteLine($"{todosTodDelete.Count} todos was deleted");
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}
