using FarmerJohnDataAccessLayer.Models;

namespace FarmerJohnDataAccessLayer.DAOs;

public interface IUserDao{
    public Task<UserModel> GetUserByUsername(string username);
    public Task<UserModel> GetUserByEmail(string email);
    public Task<UserModel> AddUser(UserModel userModel);
}