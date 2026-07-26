import type { TCourseDetailsInfo } from "@types";
import { FaStar } from "react-icons/fa";
import { MessageCircle } from "lucide-react";

type Props = {
  course: TCourseDetailsInfo;
};


const CourseReviews = ({ course }: Props) => {

  const average =
    course.reviews.length > 0
      ? (
          course.reviews.reduce(
            (acc, review) => acc + review.rating,
            0,
          ) / course.reviews.length
        ).toFixed(1)
      : "0.0";



  return (
    <section
      className="
        rounded-3xl
        bg-surface-50
        p-6
        shadow-lg
        shadow-primary-100/40
        md:p-8
      "
    >


      {/* Header */}

      <div
        className="
          mb-10
          flex
          flex-col
          justify-between
          gap-6
          md:flex-row
          md:items-center
        "
      >

        <div>

          <div className="flex items-center gap-2">

            <MessageCircle
              className="
                h-8
                w-8
                text-primary-600
              "
            />

            <h2
              className="
                text-3xl
                font-bold
                text-ink-900
              "
            >
              Course Reviews
            </h2>

          </div>


          <p
            className="
              mt-3
              text-neutral-500
            "
          >
            {course.reviews.length} Students shared their experience
          </p>


        </div>



        {/* Rating Box */}

        <div
          className="
            rounded-2xl
            bg-primary-50
            px-6
            py-4
            text-center
          "
        >

          <div
            className="
              flex
              justify-center
              gap-1
            "
          >

            {
              [1,2,3,4,5].map((star)=>(
                <FaStar
                  key={star}
                  className="
                    text-accent-500
                  "
                />
              ))
            }

          </div>


          <p
            className="
              mt-2
              text-4xl
              font-bold
              text-primary-700
            "
          >
            {average}
          </p>


          <p
            className="
              text-sm
              text-neutral-500
            "
          >
            Average Rating
          </p>


        </div>


      </div>




      {/* Reviews List */}

      <div className="space-y-5">


        {
          course.reviews.length === 0 ? (

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-surface-300
                py-12
                text-center
              "
            >

              <h3
                className="
                  text-xl
                  font-semibold
                  text-ink-800
                "
              >
                No Reviews Yet
              </h3>


              <p
                className="
                  mt-2
                  text-neutral-500
                "
              >
                Be the first student to review this course.
              </p>


            </div>


          ) : (


            course.reviews.map((review)=>(


              <article
                key={review.id}
                className="
                  rounded-2xl
                  border
                  border-surface-300
                  bg-surface-50
                  p-5
                  transition-all
                  duration-300
                  hover:border-primary-300
                  hover:shadow-lg
                  hover:shadow-primary-100/50
                "
              >


                <div
                  className="
                    flex
                    gap-4
                  "
                >


                  {/* Avatar */}

                  <img
                    src={review.student.avatar}
                    alt={review.student.full_name}
                    className="
                      h-14
                      w-14
                      shrink-0
                      rounded-full
                      border-2
                      border-primary-200
                      object-cover
                    "
                  />



                  <div className="flex-1">


                    <div
                      className="
                        flex
                        flex-wrap
                        items-start
                        justify-between
                        gap-3
                      "
                    >


                      <div>

                        <h3
                          className="
                            text-lg
                            font-bold
                            text-ink-900
                          "
                        >
                          {review.student.full_name}
                        </h3>


                        <p
                          className="
                            mt-1
                            text-sm
                            text-neutral-500
                          "
                        >
                          {
                            new Date(
                              review.created_at
                            ).toLocaleDateString()
                          }
                        </p>


                      </div>



                      {/* Stars */}

                      <div
                        className="
                          flex
                          rounded-full
                          bg-accent-50
                          px-3
                          py-1.5
                        "
                      >

                        {
                          [1,2,3,4,5].map((star)=>(

                            <FaStar
                              key={star}
                              className={`
                                text-sm
                                ${
                                  star <= review.rating
                                  ? "text-accent-500"
                                  : "text-neutral-300"
                                }
                              `}
                            />

                          ))
                        }

                      </div>


                    </div>




                    <p
                      className="
                        mt-4
                        leading-8
                        text-ink-600
                      "
                    >
                      {review.comment}
                    </p>



                  </div>


                </div>


              </article>


            ))

          )
        }


      </div>



    </section>
  );
};


export default CourseReviews;