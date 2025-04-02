function Sidebar(){
    return <>
        <div className="sidebar">
       <aside class="flex flex-col w-72 h-screen px-4 py-8 overflow-y-auto bg-white border-r">
    <a href="#">
        <img class="w-auto h-6 sm:h-7" src="https://merakiui.com/images/logo.svg" alt="" />
    </a>

    <div class="relative mt-6">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
        </span>

        <input type="text" class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
    </div>

    <div class="flex flex-col justify-between flex-1 mt-6">
        <nav>
            <a class="flex items-center px-4 py-2 text-black bg-[#e3d7f9] rounded-md" href="#">
                <img className="h-5 w-5" src="https://cdn-icons-png.flaticon.com/128/8899/8899687.png" alt="" />
                <span class="mx-4 font-semibold">Dashboard</span>
            </a>
            <a class="flex items-center px-4 py-2 mt-5 text-black transition-transform duration-300  rounded-md hover:bg-[#e3d7f9] hover:scale-110" href="#">
                <img className="h-5 w-5" src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="" />
                <span class="mx-4 font-semibold">Profile</span>
                        </a>
                        
            <a class="flex items-center px-4 py-2 mt-5 text-black transition-transform duration-300 rounded-md hover:bg-[#e3d7f9] hover:scale-110" href="#">
               <img className="h-5 w-5" src="https://cdn-icons-png.flaticon.com/128/4509/4509274.png" alt="" />
                <span class="mx-4 font-semibold">Subjects</span>
                        </a>

                         <a class="flex items-center px-4 py-2 mt-5 text-black transition-transform duration-300 rounded-md hover:bg-[#e3d7f9] hover:scale-110" href="#">
                <img className="h-5 w-5" src="https://cdn-icons-png.flaticon.com/128/9913/9913467.png" alt="" />
                <span class="mx-4 font-semibold">Exams</span>
                        </a>
                        
                    
                        
                         <a class="flex items-center px-4 py-2 mt-5 text-black transition-transform duration-300 rounded-md hover:bg-[#e3d7f9] hover:scale-110" href="#">
                <img className ="h-5 w-5" src="https://cdn-icons-png.flaticon.com/128/9913/9913576.png" alt="" />
                <span class="mx-4 font-semibold">Result</span>
                        </a>
                        
                    
                        
                   
                     

                         <hr class="my-6  dark:border-gray-900" />

                        
                         <a class="flex items-center px-4 py-2 mt-5 text-black transition-transform duration-300  rounded-md hover:bg-[#e3d7f9] hover:scale-110" href="#">
                <img className ="h-5 w-5" src=" https://cdn-icons-png.flaticon.com/128/3953/3953226.png" alt="" />
                <span class="mx-4 font-semibold">Setting</span>
                        </a>
                    </nav>
                    
                    

        <a href="#" class="flex items-center px-4 -mx-2 transition-transform hover:scale-105">
            <img class="object-cover mx-2 rounded-full h-9 w-9" src="https://cdn-icons-png.flaticon.com/128/149/149071.png" alt="avatar" />
            <span class="mx-2 font-medium text-gray-800">Chandan Singh</span>
        </a>
    </div>
</aside>



        </div>
         </>
        
}
export default Sidebar