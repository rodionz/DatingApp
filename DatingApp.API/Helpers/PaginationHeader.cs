namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage {get;set;}
        public int ItemsPerPage {get;set;}
        public int TotallItems {get;set;}
        public int TotalPages {get;set;}

        public PaginationHeader(int currentPage, int itemsPerPage, 
        int totallItems, int totalPages)
        {
           this.CurrentPage = currentPage;
           this.ItemsPerPage = itemsPerPage;
           this.TotallItems = totallItems;
           this.TotalPages = totalPages;
        }

    }
}