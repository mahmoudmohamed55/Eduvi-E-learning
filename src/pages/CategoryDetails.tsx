import CourseCard from "@components/cards/CourseCard";
import { GridList } from "@components/common/gridlist/GridList";
import { Heading } from "@components/common/heading/Heading";
import { useCategoryDetails } from "@hooks/useCategoryDetails";
import course from "@assets/course.png";

 const CategoryDetails = () => {
  const { records, loading, error } = useCategoryDetails();
  return (
    <div className="bg-surface-100 mt-4 rounded-3xl container px-3 md:px-0 pb-4">
      <Heading
        title="Category Details"
        description="Explore our wide range of categories and find the perfect course for your learning journey."
        image={course}
      />
      <div className="grid grid-cols-1 mt-3 gap-4 sm:grid-cols-2  lg:grid-cols-3 px-0 md:px-4">
        <GridList
          records={records}
          render={(course) => <CourseCard key={course.id} {...course} />}
        />
      </div>
    </div>
  );
};

export default CategoryDetails;
