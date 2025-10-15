import Cookies from "universal-cookie";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "/api",
});

const cookie = new Cookies();

class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(user_name: string, password: string) {
    const response = await axiosInstance.post("api/v1/login", {
      user_name,
      password,
    });
    const token = response.data.access_token;
    cookie.set("Bearer", token, { path: "/" });
    cookie.set("Username", user_name);
    return response.data;
  }

  async register(email: string, user_name: string, password: string) {
    const response = await axiosInstance.post("api/v1/user", {
      email,
      user_name,
      password,
    });
    const token = response.data.access_token;
    cookie.set("Bearer", token, { path: "/" });
    cookie.set("Username", user_name);
    cookie.set("Email", email);
    
    return response.data;
  }

  logout(currentUser: any): void {
    cookie.remove("Bearer", { path: "/" });
    cookie.remove("Username");
    cookie.remove("Email");
    currentUser.setAuth({ token: "", username: "", email: "" });
    console.log("token removed");
  }

  isAuthenticated(currentUser: any): boolean {
    const token = cookie.get("Bearer");
    if (token !== undefined){
      return true;
    }
    return false;
  }
}

const authServiceInstance = AuthService.getInstance();
export default authServiceInstance;
