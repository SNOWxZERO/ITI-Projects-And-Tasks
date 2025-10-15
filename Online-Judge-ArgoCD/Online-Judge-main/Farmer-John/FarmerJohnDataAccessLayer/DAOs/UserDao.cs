using FarmerJohnDataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace FarmerJohnDataAccessLayer.DAOs;

public class UserDao : IUserDao{
    private readonly FramerJohnDbContext _framerJohnDbContext;

    public UserDao(FramerJohnDbContext framerJohnDbContext){
        _framerJohnDbContext = framerJohnDbContext;
    }

    public async Task<UserModel> GetUserByUsername(string username){
        return await _framerJohnDbContext.Users.SingleOrDefaultAsync(user => user.UserName == username);
    }

    public async Task<UserModel> GetUserByEmail(string email){
        return await _framerJohnDbContext.Users.SingleOrDefaultAsync(user => user.Email == email);
    }

    public async Task<UserModel> AddUser(UserModel userModel){
        await _framerJohnDbContext.Users.AddAsync(userModel);
        _framerJohnDbContext.SaveChanges();
        return await GetUserByUsername(userModel.UserName);
    }
}