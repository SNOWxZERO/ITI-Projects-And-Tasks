using System.ComponentModel.DataAnnotations;

namespace FarmerJohnDataAccessLayer.Models; 

public class UserModel {
    [Key]
    public int Id { get; set; }
    
    public string UserName { get; set; }
    
    public string Email { get; set; }
    public string PasswordSalt { get; set; }
    public string PasswordDigest { get; set; }
    
    public ICollection<SubmissionModel> Submissions { get; set; }
}