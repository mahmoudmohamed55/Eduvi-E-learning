
import { GridList } from "@components/common/gridlist/GridList";
import { Heading } from "@components/common/heading/Heading";
import CourseCard from "@components/cards/CourseCard";

import img from "@assets/course.png";

import Loading from "@components/feedback/loading/Loading";
import CourseCardSkeleton from "@components/feedback/skeletons/courseskeleton/CourseCardSkeleton";
import useWishList from "@hooks/useWishList";

const Favorites = () => {
  const { loading, error,  courseFullInfo } = useWishList();

  return (
    <>
      <Heading
        title="Favorites"
        description="Explore Your Favorite Courses and Start Your Learning Journey"
        image={img}
      />
      <Loading
        status={loading}
        error={error}
        skeleton={<CourseCardSkeleton count={3} />}
      >
        <div className="container mt-4 rounded-3xl bg-surface-100 px-3 pb-4">
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <GridList
              records={courseFullInfo}
              render={(course) => <CourseCard key={course.id} {...course} />}
            />
          </div>
        </div>
      </Loading>
    </>
  );
};

export default Favorites;
