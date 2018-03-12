using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _contex;

        public DatingRepository(DataContext contex)
       {
            this._contex = contex;
        }

        public void Add<T>(T entity) where T : class
        {
            _contex.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
           _contex.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _contex.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _contex.Users.Include(p => p.Photos).ToListAsync();
            return users;
        }

        public async Task<bool> SavaAll()
        {
           return await _contex.SaveChangesAsync() > 0;
        }
    }
}