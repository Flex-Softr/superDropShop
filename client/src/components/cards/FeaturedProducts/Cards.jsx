import { Link } from "react-router-dom";
import { CategoryImg } from "../../avaters/Avatars";
import { CategoryTitles } from "../../titles/FeatureTitle";

const ProductCards = ({ category }) => {
  return (
    <Link
      to={`/product-category/${category?.slug}`}
      className="text-center flex flex-col justify-center items-center cursor-pointer gap-5 rounded-3xl border"
    >
      <CategoryImg src={category.img} />
      <CategoryTitles title={category.name} />
    </Link>
  );
};

export { ProductCards };
