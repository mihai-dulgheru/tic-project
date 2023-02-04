import { login, signup } from "@/api/auth";

let timer;

export default {
  async auth(context, payload) {
    const { email, mode, password } = payload;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let responseData;
    try {
      switch (mode) {
        case "login":
          responseData = await login(data);
          break;
        case "signup":
          responseData = await signup(data);
          break;
      }
    } catch (error) {
      throw new Error(error?.message || "Failed to authenticate.");
    }

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("email", responseData.email);
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("tokenExpiration", expirationDate);
    localStorage.setItem("userId", responseData.localId);

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      email: responseData.email,
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },

  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },

  tryLogin(context) {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const userId = localStorage.getItem("userId");

    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token,
        userId,
        email,
      });
    }
  },

  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },

  logout(context) {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("userId");

    clearTimeout(timer);

    context.commit("setUser", {
      email: null,
      token: null,
      userId: null,
    });
  },

  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
