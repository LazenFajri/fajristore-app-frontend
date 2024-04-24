import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import Collection from "./components/Collection";
import Hero from "./components/Hero";
import Products from "./components/Products";

export default function Home({ featuredProduct, newProducts, collectionProduct1, allProducts }) {
  return (
    <main
      className={`min-h-screen p-4 bg-background `}
    >

      <Hero product={featuredProduct} />

      <hr class="my-1 h-px border-0 bg-gray-300" />

      <Products products={newProducts} />
      <hr class="my-1 h-px border-0 bg-gray-300" />
      <Collection product={collectionProduct1} />
    </main>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredId = '6618d9e34a0fbede0e18776a';
  const collectionId = '6618df384a0fbede0e18778c';

  const featuredProduct = await Product.findById(featuredId);
  const collectionProduct1 = await Product.findById(collectionId);
  const newProducts = await Product.find({}, null, {sort: {'_id': 1}, limit: 5})
  const allProducts = await Product.find({}, null, {sort: {'_id': 1}})

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      collectionProduct1: JSON.parse(JSON.stringify(collectionProduct1)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      allProducts: JSON.parse(JSON.stringify(allProducts)),
    }
  }
}
