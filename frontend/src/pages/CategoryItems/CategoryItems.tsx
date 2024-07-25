import { useNavigate, useParams } from "react-router-dom";
import Product from "../../components/Product";
import { ROUTE_ROOT } from "../../constants/routes";
import { useGetItemByCategoryQuery } from "../../redux/services/items";

const CategoryItems = () => {
  const navigate = useNavigate();
  const { category_id } = useParams();
  const { data } = useGetItemByCategoryQuery(
    {
      category_id: category_id,
    },
    { skip: !category_id }
  );

  return (
    <div className="container mx-auto flex flex-col gap-5 w-full">
      <div className="text-lg font-semibold">
        <span className="text-primary">
          <button onClick={() => navigate(ROUTE_ROOT)}>All</button>
        </span>{" "}
        / {data?.name}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 mx-auto gap-4">
        {data?.items?.map((item: any) => (
          <Product
            key={item.id}
            id={item.id}
            {...{ item }}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryItems;
