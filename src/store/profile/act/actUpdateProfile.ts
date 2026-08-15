import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";
import type { TUpdateProfile } from "@types";

const actUpdateProfile = createAsyncThunk(
  "profile/actUpdateProfile",
  async (data: TUpdateProfile, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return rejectWithValue("User not found");
      }

      let avatarUrl: string | undefined;
console.log(data);
      // Upload new avatar if selected
      if (data.avatar) {
        const fileExt = data.avatar.name.split(".").pop();

        const fileName = `${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("avatar")
          .upload(fileName, data.avatar, {
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrl } = supabase.storage
          .from("avatar")
          .getPublicUrl(fileName);

        avatarUrl = publicUrl.publicUrl;
      }

      const payload = {
        full_name: data.full_name,
        phone: data.phone,
        ...(avatarUrl && { avatar: avatarUrl }),
      };

      const { data: profile, error } = await supabase
        .from("profiles")
        .update(payload)
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return profile;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default actUpdateProfile;