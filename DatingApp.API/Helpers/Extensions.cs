using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message ){         
          response.Headers.Add("Application-Error", message);
          response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
          response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static void AddPagination(this HttpResponse response, int currentPage,
        int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage,itemsPerPage,totalItems,totalPages);
           var camelCaseFormatt = new JsonSerializerSettings();
           response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatt));
           response.Headers.Add("Access-Control-Expose-Headers", "Pagination"); 
        }
        
        public static int Age(this DateTime dateToage){        
          var age = DateTime.Today.Year  - dateToage.Year;

          if(dateToage.AddYears(age) > DateTime.Today)
          {
              age--;
          }

          return age;
        }

    }
}