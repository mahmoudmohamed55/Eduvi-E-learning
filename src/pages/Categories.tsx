import CategoryCard from "@components/cards/CategoryCard";
import { GridList } from "@components/common/gridlist/GridList";
import { Heading } from "@components/common/heading/Heading";
import { useCategories } from "@hooks/useCategories";
import img from "@assets/category.png";
import Loading from "@components/feedback/loading/Loading";
import CategoryCardSkeleton from "@components/feedback/skeletons/categoryskeleton/CategoryCardSkeleton";
const Categories = () => {
  const { records, loading, error } = useCategories();
  console.log("CATEGORY LOADING:", loading);
  console.log("CATEGORY ERROR:", error);
  return (
    <>
      <Heading
        title="Categories"
        description="Explore our wide range of categories and find the perfect course for your learning journey."
        image={img}
      />
      <Loading
        status={loading}
        error={error}
        skeleton={<CategoryCardSkeleton count={8} />}
      >
        <div className="bg-surface-100 mt-4 rounded-3xl container mb-4">
          <div className="grid grid-cols-1 mt-3 gap-4 sm:grid-cols-2  lg:grid-cols-3">
            <GridList
              records={records}
              render={(category) => (
                <CategoryCard key={category.id} {...category} />
              )}
            />
          </div>
        </div>
      </Loading>
    </>
  );
};

export default Categories;
