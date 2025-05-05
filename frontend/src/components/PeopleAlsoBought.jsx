import { useEffect,useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";


const PeopleAlsoBought = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchRecommendations = async () =>{
            try{
                const res = await axios.get("/products/recommendations")
                setRecommendations(res.data)
            }
            catch(error)
            {
                toast.error(error.response.data.message || "An error occurred while fetching recommendations")
            }
            finally{
                setIsLoading(false)
            }
        };
        fetchRecommendations();
    },[]);

    if(isLoading) return <LoadingSpinner/>

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-4">People Also Bought</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommendations.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default PeopleAlsoBought;