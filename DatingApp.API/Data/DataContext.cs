using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) :base(options) { 
        }

        public DbSet<value> Values {get;set;}
        public DbSet<User> Users {get;set;}
        public DbSet<Photo> Photos{get;set;}
        public DbSet<Message> Messages {get;set;}

        public override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Message>()
            .HasOne(u => u.Sender)
            .WithMany(m => m.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);
             
             builder.Entity<Message>()
            .HasOne(u => u.Recipient)
            .WithMany(m => m.MessageRecieved)
            .OnDelete(DeleteBehavior.Restrict);
        }
    }
}