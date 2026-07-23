import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";
import type actAuthRegister from "./actAuthRegister";

type TAuthLogin = {
  email: string;
  password: string;
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (data: TAuthLogin, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
     return rejectWithValue(error.message);
    }
    console.log("signInData", signInData);
    return signInData;
  },
);

export default actAuthLogin;
