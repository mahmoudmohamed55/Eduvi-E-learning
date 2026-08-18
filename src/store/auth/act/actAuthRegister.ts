import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";

type TAuthRegister = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actAuthRegister",
  async (data: TAuthRegister, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });

    if (error) {
      switch (error.code) {
        case "user_already_exists":
          return rejectWithValue("This email is already registered.");

        case "weak_password":
          return rejectWithValue("Password is too weak.");

        case "over_email_send_rate_limit":
          return rejectWithValue("Too many attempts. Please try again later.");

        default:
          return rejectWithValue(error.message);
      }
    }
    if (signUpData?.user) {
      await supabase.from("profiles").insert({
        id: signUpData.user.id,
        full_name: signUpData.user.user_metadata.name,
        role: "student",
      });
    }
  
    return signUpData;
  },
);

export default actAuthRegister;
