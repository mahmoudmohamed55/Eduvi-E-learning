import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@utils/supabase";

import type { TCourse } from "@types";

const actGetWishListCourses = createAsyncThunk<
  TCourse[],
  string[],
  { rejectValue: string }
>(
  "wishlist/getWishListCourses",

  async (courseIds, { rejectWithValue }) => {
    try {
     

      if (!courseIds.length) {
     

        return [];
      }

     

      const { data: courses, error: coursesError } = await supabase
        .from("courses")
        .select(
          `
            id,
            title,
            slug,
            thumbnail,
            description,
            rate,
            price,
            category_id,
            instructor_id,
            level
          `,
        )
        .in("id", courseIds);

    
      if (coursesError) {
        return rejectWithValue(coursesError.message);
      }

      if (!courses) {
       

        return [];
      }

     

      // Get instructor IDs
      const instructorIds = [
        ...new Set(
          courses.map((course) => course.instructor_id).filter(Boolean),
        ),
      ];

     

      if (!instructorIds.length) {
        return courses.map((course) => ({
          ...course,

          instructor: {
            full_name: "",
            avatar: "",
          },
        })) as TCourse[];
      }

     

      const { data: instructors, error: instructorsError } = await supabase
        .from("profiles")
        .select(
          `
          id,
          full_name,
          avatar
        `,
        )
        .in("id", instructorIds);

     
      if (instructorsError) {
        return rejectWithValue(instructorsError.message);
      }

      const finalCourses: TCourse[] = courses.map((course) => {
        const instructor = instructors?.find(
          (profile) => profile.id === course.instructor_id,
        );

        return {
          id: course.id,
          title: course.title,
          slug: course.slug,
          thumbnail: course.thumbnail,
          description: course.description,
          rate: course.rate,
          price: course.price,
          category_id: course.category_id,
          instructor_id: course.instructor_id,
          level: course.level,

          instructor: {
            full_name: instructor?.full_name ?? "",

            avatar: instructor?.avatar ?? "",
          },
        };
      });

    

      return finalCourses;
    } catch (error) {
      console.error("❌ actGetWishListCourses ERROR:", error);

      return rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  },
);

export default actGetWishListCourses;
