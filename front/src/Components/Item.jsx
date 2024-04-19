import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Item = (props) => {
  const navigate = useNavigate();

  const sendProduct = (property) => {
    navigate(`/property`, { state: { property } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="w-[230px] hover:scale-[1.05] hover:duration-150"
      onClick={() => sendProduct(props)}
    >
      <img
        src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="product_image"
      />
      <div className=" flex justify-between items-center">
        <p className="mt-[8px] text-[15px]">{props?.name}</p>
        <p className="mt-[8px] text-[14px]">₹{props?.price}</p>
      </div>

      <div className=" flex justify-between items-center">
        <p className="mt-[8px] text-[15px]">Area</p>
        <p className="mt-[8px] text-[14px]">{props?.size}</p>
      </div>
    </div>
  );
};

export default Item;
