import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
//import useSWR from "swr";
const { colors } = require('tailwindcss/defaultTheme')

//fetch api 
function Pokemon_List() {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "InfinitePokemons",
    async ({ pageParam = 1 }) =>
      await fetch(
        `/api/poke?page=${pageParam}&limit=12`
      ).then((result) => result.json()),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.next) {
          return pages.length + 1;
        }
        
      },
    }
  );
  return (
    <div>

        {/* Head */}
      <Head>
          <title>Pokemon Challenge</title>
          <meta name="description" content="Bytecode labs challenge."/>
          <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&display=swap" rel="stylesheet" />      </Head>

      {/* Header */}
      <header className="py-10 mb-1 bg-teal-800">
            
              <h1 className="text-center text-8xl">Pokemon</h1>
             <p className="font-Josefin text-center text-sm mt-5">BytecodeLabs Challenge</p>
         
      </header>


    <div className="container mx-auto">
      {status === "success" && (
        <InfiniteScroll
          dataLength={data?.pages.length * 2}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4>Catching more pokemons...</h4>}
        >
          <div className='grid grid-cols-4 pt-10 pl-20 pr-10 gap-1 '>
            {data?.pages.map((page) => (
              <>
                {page.results.map((pokemon) => (
                  <div className="" key={pokemon.id}>
                                      
                    <div className=" pt-10 "></div>
                    {/* Pokemon card */}

                   <div className="max-w-sm table-cell bg-teal-800 shadow-2xl rounded-xl">
                    
                    <Image className=" object-center"
                                   alt={pokemon.name}
                                   width={250}
                                   height={250}
                                   src={pokemon.imageURL}/>  
                       
                       <div className="mb-2">
 
                       <table className=" table-fixed px-1 mx-2">
                         <thead>
                           <th className="text-xs text-left font-Josefin  ">Name</th>
                           <th className="text-xs text-right w-10/12 font-Josefin">Base Experience</th>
                         </thead>
 
                         <tbody>
                           <tr>
                             <td className="text-sm text-bold ">{pokemon.name}</td>
                             <td className="text-sm text-right text-bold">{pokemon.baseExperience}</td>
                           </tr>
                         </tbody>
                       </table>
 
                       </div>
                   </div>

                  </div>
                ))}
              </>
            ))}
          </div>
        </InfiniteScroll>
      )}




        </div>
    </div>
  );
}

export default Pokemon_List;
