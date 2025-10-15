using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FarmerJohnCommon.DTOs;
using FarmerJohnDataAccessLayer.DAOs;
using FarmerJohnDataAccessLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace FarmerJohnBusinessLayer.AuthHandler;

public class AuthServiceHandler : IAuthServiceHandler {
    private readonly IUserDao userDao;
    private readonly PasswordHasher<UserModel> passwordHasher;
    private readonly IConfiguration config;

    public AuthServiceHandler(IConfiguration config, IUserDao userDao) {
        this.config = config;
        this.userDao = userDao;
        passwordHasher = new PasswordHasher<UserModel>();
    }

    public async Task<BaseAuthResponseDto> RegisterAsync(RegisterRequestDto registerRequestDto) {
        if (await userDao.GetUserByEmail(registerRequestDto.Email) != null) {
            return new BaseAuthResponseDto {
                ResponseDescription = "Email is already registered!",
                ResponseCode = "2",
            };
        }

        if (await userDao.GetUserByUsername(registerRequestDto.UserName) != null) {
            return new BaseAuthResponseDto {
                ResponseDescription = "Username is already registered!",
                ResponseCode = "3",
            };
        }

        var user = new UserModel {
            UserName = registerRequestDto.UserName,
            Email = registerRequestDto.Email,
        };

        var random = new Random();
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var randomString = new string(Enumerable.Repeat(chars, 20)
            .Select(s => s[random.Next(s.Length)]).ToArray());
        user.PasswordSalt = randomString;
        user.PasswordDigest = passwordHasher.HashPassword(user, user.PasswordSalt + registerRequestDto.Password);
        await userDao.AddUser(user);

        var jwtToken = CreateJwtToken(user);
        var userData = new BaseAuthResponseDto {
            ResponseDescription = "Registration successful",
            ResponseCode = "1",
            AccessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken),
        };
        return userData;
    }

    public async Task<BaseAuthResponseDto> LoginAsync(LoginRequestDto loginRequestDto) {
        var user = await userDao.GetUserByUsername(loginRequestDto.UserName);
        if (user == null || passwordHasher.VerifyHashedPassword(user, user.PasswordDigest,
                user.PasswordSalt + loginRequestDto.Password) == PasswordVerificationResult.Failed) {
            return new BaseAuthResponseDto {
                ResponseDescription = "Email or Password is incorrect!",
                ResponseCode = "4"
            };
        }

        var jwtToken = CreateJwtToken(user);
        var userData = new BaseAuthResponseDto {
            ResponseDescription = "Login successful",
            ResponseCode = "1",
            AccessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken),
        };
        return userData;
    }

    private JwtSecurityToken CreateJwtToken(UserModel user) {
        var claims = new List<Claim> {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };
        var token = new JwtSecurityToken(
            issuer: config["JWT:Issuer"],
            audience: config["JWT:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMonths(1),
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:Key"] !)), SecurityAlgorithms.HmacSha256));
        return token;
    }
}