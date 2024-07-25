import { useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";
import Product from "../../components/Product";
import { ROUTE_ITEMS_BY_CATEGORY } from "../../constants/routes";
import {
  useGetItemCategoriesQuery,
  useGetItemCategorySearchQuery,
} from "../../redux/services/items";

const Banner = () => {
  return (
    <div className="bg-green-400 rounded-xl flex items-center justify-center md:my-10">
      <img
        src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg"
        className="w-full"
        alt="banner"
      />
    </div>
  );
};

const Category = ({ data }: any) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() =>
        navigate(
          generatePath(ROUTE_ITEMS_BY_CATEGORY, { category_id: data?.id })
        )
      }
    >
      <div className="text-center">
        <div className="p-1 rounded flex items-center justify-center bg-blue-50">
          <img
            src={data.image_url}
            className="w-full object-fill"
            alt={data.name}
          />
        </div>
        {/* {data.name} */}
      </div>
    </button>
  );
};

const Dashboard = () => {
  const { data: categories } = useGetItemCategoriesQuery();
  const itemSearch = useSelector((state: any) => state.user.itemSearch);
  const { data: searchResult } = useGetItemCategorySearchQuery(
    { search: itemSearch },
    { skip: !itemSearch }
  );
  if (itemSearch) {
    return (
      <div className="container mx-auto px-16 grid grid-cols-6 gap-5 w-full">
        {searchResult?.length > 0 &&
          searchResult.map((item: any, index: number) => {
            return (
              <Product
                key={index + item.name}
                {...{ item }}
              />
            );
          })}
        {searchResult?.length === 0 && <div>No Result Found</div>}
      </div>
    );
  }
  return (
    <div className="container mx-auto px-16 flex flex-col gap-5 w-full">
      {categories && <Banner />}
      <div className="flex gap-5 my-2 mx-auto">
        {categories?.map((category: any) => (
          <Category
            key={category?.id}
            data={category}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
