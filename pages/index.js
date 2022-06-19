import InfiniteScroll from 'react-infinite-scroll-component';
import Head from "next/head";
import Image from "next/image"
import useSWRInfinite from 'swr/infinite'
import axios from "axios";


function PokeApp() {

    const fetcher = async (url) => await axios.get(url).then((res) => res.data);

    const getKey = (pageIndex) => {
        pageIndex += 1;
        return `/api/poke?page=${pageIndex}`
      }

    const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

    const paginatedPosts = data?.flat();

    const isReachedEnd = size > 42;

      return (

        <div>

        {/* Head */}
      <Head>
          <title>Pokemon Challenge</title>
          <meta name="description" content="Bytecode labs challenge."/>
          <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&display=swap" rel="stylesheet" />      </Head>

      {/* Header */}
      <header className="py-10 mb-1 bg-red-400">
            
              <h1 className="text-center text-8xl">Pokemon</h1>
             <p className="font-Josefin text-center text-sm mt-5">BytecodeLabs Challenge</p>
         
      </header>


    <div className="container mx-auto">
    
    
    <InfiniteScroll next={()=>setSize(size+1)} hasMore={!isReachedEnd} endMessage={<p className='text-center font-bold'><br></br>no more pokemons!</p>} 
    dataLength={ paginatedPosts?.length ?? 0 } loader={<p className='text-center font-bold'><br></br>catching more pokemons ...</p>} >

          <div className='grid grid-cols-4 pt-10 pl-20 pr-10 gap-1 '>
            {paginatedPosts?.map((page) => (
              <>
                {page.results.map((pokemon) => (
                  <div className="" key={pokemon.id}>
                                      
                    <div className=" pt-10 "></div>
                    {/* Pokemon card */}

                   <div className="max-w-sm table-cell bg-red-400 shadow-2xl rounded-xl">
                    
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

{/*
                    <br></br>
                    {!isReachedEnd && <button onClick={}>Load more</button>}
                    <br></br>
*/}
  
        </div>
    </div>
  );
}

 
export default PokeApp;
