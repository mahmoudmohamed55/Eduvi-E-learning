import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCourseDetailsInfo } from "@types";
import { supabase } from "@utils/supabase";


const actGetCourseDetails = createAsyncThunk<
  TCourseDetailsInfo,
  string,
  {
    rejectValue: string;
  }
>(
  "courseDetails/actGetCourseDetails",

  async (slug, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;


    try {

      const { data, error } = await supabase
        .from("courses")
        .select(`
          id,
          title,
          slug,
          description,
          thumbnail,
          price,
          level,
          rate,


          instructor:profiles!courses_instructor_id_fkey(
            id,
            full_name,
            avatar
          ),


          sections(
            id,
            title,
            order_number,

            lessons(
              id,
              title,
              order_number,
              video_url
            )
          ),


          reviews(
            id,
            rating,
            comment,
            created_at,

            student:profiles!reviews_student_id_fkey(
              id,
              full_name,
              avatar
            )
          )

        `)
        .eq("slug", slug)
        .single();



      if(error){
        throw error;
      }



      const formattedData = {
        ...data,

        instructor: Array.isArray(data.instructor)
          ? data.instructor[0]
          : data.instructor,


        reviews: data.reviews.map((review:any)=>({
          ...review,

          student: Array.isArray(review.student)
            ? review.student[0]
            : review.student
        }))
      };



      return formattedData as TCourseDetailsInfo;



    } catch(error){

      return rejectWithValue(
        error instanceof Error
        ? error.message
        : "Something went wrong"
      );

    }

  }
);


export default actGetCourseDetails;