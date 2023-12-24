import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

export default function ProductList() {
    const { mutate } = useSWRConfig();
    const fetcher = async () => {
        const response = await axios.get(`http://localhost:5000/products`);
        return response.data;
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:5000/products/${id}`);
        mutate("products");
    };
    const { data } = useSWR("products", fetcher);
    if (!data) return <h2>Loading...</h2>;
    return (
        <div className="flex flex-col mt-5">
            <div className="w-full">
                <Link
                    to={"/add"}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Add New
                </Link>
                <div className="relative rounded-lg shadow mt-5">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="py-3 px-1 text-center">No</th>
                                <th className="py-3 px-6">Product Name</th>
                                <th className="py-3 px-6">Price</th>
                                <th className="py-3 px-1 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((e, i) => (
                                <tr key={i} className="bg-white border-b">
                                    <td className="py-3 px-1 text-center">
                                        {i + 1}
                                    </td>
                                    <td className="py-3 px-6 font-medium text-gray-900">
                                        {e.name}
                                    </td>
                                    <td className="py-3 px-6">{e.price}</td>
                                    <td className="py-3 px-1 text-center">
                                        <Link
                                            to={`/edit/${e.id}`}
                                            className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded-lg text-white mr-1"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => {
                                                deleteProduct(e.id);
                                            }}
                                            className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded-lg text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
