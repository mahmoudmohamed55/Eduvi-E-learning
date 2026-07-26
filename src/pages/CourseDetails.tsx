import CourseHero from "@components/courseDetails/CourseHero";
import CourseReviews from "@components/courseDetails/CourseReviews";
import CourseSidebar from "@components/courseDetails/CourseSidebar";
import useCourseDetails from "@hooks/useCourseDetails";

const CourseDetails = () => {
  const { record, loading, error } = useCourseDetails();

  if (loading === "pending") return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!record) return null;

  return (
    <section className="container py-10 space-y-10">
      <CourseHero course={record} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CourseReviews course={record} />
        </div>

        <CourseSidebar course={record} />
      </div>
    </section>
  );
};

export default CourseDetails;
