// All commented parts are for client side rendering

import CarCard from "@/components/CarCard";
import CustomFilter from "@/components/CustomFilter";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";

//import Image from "next/image";
//import { useState, useEffect } from "react";

export default async function Home({ searchParams}: HomeProps) {
  // const [allCars, setAllCars] = useState([])
  // const [loading, setLoading] = useState(false)

  // //search states
  // const [manufacturer, setManufacturer] = useState("")
  // const [model, setModel] = useState("")

  // //filter states
  // const [fuel, setFuel] = useState()
  // const [year, setYear] = useState(2022)

  // //pagination state
  // const [limit, setLimit] = useState(10)

 // const getCars = async () => {
//setLoading(true)
//try {
    const allCars= await fetchCars({  //if using client side change the name to result
      manufacturer: searchParams.manufacturer || "",
      year: searchParams.year || 2022,
      fuel: searchParams.fuel || "",
      limit: searchParams.limit || 10,
      model: searchParams.model || "",
    });
//     setAllCars(result)

//    } catch (error) {
//     console.log(error);
    
//    } finally {
//       setLoading(false)
//    }
// }

//   useEffect(() => {
//     getCars();
//   }, [fuel, year, limit, manufacturer, model])


 

  //console.log(allCars);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">
            Car Catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />   {/*Add this props for for csr : setManufacturer={setManufacturer} setModel={setModel} */}
          <div className="home__filter-container">
           <CustomFilter title="fuel" options={fuels} /> {/* CSR: setFilter={setFuel} */}
            <CustomFilter title="year" options={yearsOfProduction}/>  {/* CSR: setFilter={setYear} */}
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
          {/*  {loading && (
              <div className="mt-16 w-full flex-center">
                <Image 
                  src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
          )} */}

            <ShowMore 
              pageNumber={(searchParams.limit || 10) / 10}
              isNext = {(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}

      </div>
    </main>
  )
}
