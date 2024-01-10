'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParam= useSearchParams();
  // console.log("searchparam is : ", searchParam.toString())
  const pathname= usePathname();
  // console.log("pathname is : ", pathname)
  const { replace }= useRouter();
  const handleSearch=useDebouncedCallback((term:string)=>{
    console.log("the term is: ", term)
    const param =new URLSearchParams(searchParam)
    // console.log("before : ",param.toString())
    if (term){
      param.set('query',term)
    }
    else{
      param.delete('query')
    }
    // console.log("after : ",param.toString())

    replace(`${pathname}?${param.toString()}`)
  },1000)
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e)=>{handleSearch(e.target.value)}}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
