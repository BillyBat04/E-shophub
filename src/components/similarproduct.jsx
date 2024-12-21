import { Link } from "react-router-dom"

const SimilarProduct = () => {
    return (
        <Link to={`/products/${4565}`} className="p-2 mx-2 my-2 bg-white rounded-md overflow-hidden hover:scale-110 transition-transform duration-300">
    <div className="w-[250px] h-[250px]">
        <img className="w-full h-full rounded-md" src='https://salt.tikicdn.com/cache/750x750/ts/product/27/04/0f/455b9d3e001963e89cabc903afe9f1d1.jpg.webp' />
    </div>
        <p className="text-[18px] font-bold mt-2">43.990.000₫</p>
    </Link>

    )
}

export default SimilarProduct