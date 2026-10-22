import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCourseDashboard } from "@types";
import { supabase } from "@utils/supabase";


interface TGetCoursesParams {
  page?: number;
  search?: string;
}

interface TGetCoursesResponse {
  courses: TCourseDashboard[];
  total: number;
}

const actGetCourses = createAsyncThunk<
  TGetCoursesResponse,
  TGetCoursesParams,
  { rejectValue: string }
>(
  "dashboard/courses/actGetCourses",
  async ({ page = 1, search = "" }, { rejectWithValue }) => {
    try {
      const PAGE_SIZE = 6;
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("courses")
        .select(
          `
            *,
            category:categories(id, name),
            instructor:profiles!courses_instructor_id_fkey(
              id,
              full_name,
              avatar
            )
          `,
          { count: "exact" },
        )
        .order("created_at", { ascending: false });

      const term = search.trim();

      if (term) {
        query = query.or(
          `title.ilike.%${term}%,slug.ilike.%${term}%`,
        );
      }

      const { data, error, count } = await query.range(from, to);

      if (error) return rejectWithValue(error.message);

      return {
        courses: (data ?? []) as unknown as TCourseDashboard[],
        total: count ?? 0,
      };
    } catch {
      return rejectWithValue("Failed to fetch courses");
    }
  },
);

export default actGetCourses;