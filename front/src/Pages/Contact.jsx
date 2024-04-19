import Axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!data?.email || !data?.message) {
      window.alert("Plese fill up all fields");
    }

    try {
      const res = await Axios.post(
        `http://localhost:8000/api/v1/send_message`,
        data
      );

      if (res?.data?.data) {
        toast.success(res?.data?.message);
        setData({
          email: "",
          message: "",
        });

        navigate("/");
      }
    } catch (error) {
      console.log("contact Error!", error.message);
      toast.success("Please Use Registerd Email Address");
    }
  };
  return (
    <>
      <section id="contact" className="py-12 flex justify-center items-center">
        <div className="w-full">
          <div className="bg-white m-auto p-5  w-3/4">
            <h3 className="text-3xl mb-8 p-4 justify-center">
              Send Us your Query
            </h3>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  value={data?.email}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your registered Email Address"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={data?.message}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your message or query"
                  rows="5"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="button"
                  className="w-full bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
                  onClick={(e) => sendMessage(e)}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
