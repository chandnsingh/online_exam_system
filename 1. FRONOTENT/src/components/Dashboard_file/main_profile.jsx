import "../../main.css"
import ProfileDetails from "./main_profile_deitails"
import Notification from "./notification"

function MainProfile() {
    return <>
        <div className="w-screen h-screen bg-gradient-to-bl from-blue-200 to-purple-200 overflow-hidden">
            <div className="h-[93.5%] w-[96%] bg-white rounded-xl m-6 ">
                <div className="w-full h-10 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-white p-15 rounded-t-xl">

                </div>
                <div className="relative -top-17 left-14">
                <img className="ml-2" src="https://cdn-icons-png.flaticon.com/128/3135/3135768.png" alt="" />
                    <h1 className="m-1 text-lg font-bold from-neutral-900 ">CHANDAN SINGH</h1>
                </div>
               
                <div className="w-143 h-107 bg-[#f5f0f7] rounded-xl ml-7 relative -top-11 overflow-hidden">
                    <h1 className="p-5 font-bold text-xl">Current Semester Information</h1>
                    <div className="px-5">
                        
                        <ProfileDetails
                            heading="Semester session"
                            title = "2024 - 2025"
                        />

                        <ProfileDetails
                            heading="Current Semester"
                            title = "VIII"
                        />

                        <ProfileDetails
                            heading="Course"
                            title = "B.tech (Computer Science & Engineering)"
                        />

                        <ProfileDetails
                            heading="University Number"
                            title = "210030101008"
                        />

                        <ProfileDetails
                            heading="University name"
                            title = "Amrapali University"
                        />
                    </div>
                </div>
                <div className="w-140 h-41 bg-[#f5f0f7] rounded-xl relative -top-145 left-155 p-5">
                    <h1 className="font-bold pb-3 text-xl">Profile Summary</h1>
                    <p>0 Total Exam Attempted</p>
                    <p>0 Best Score</p>
                    <p>0 Average Score</p>
                </div>
                <div className="w-140 h-91 bg-[#f5f0f7] rounded-xl relative -top-142 left-155 p-4">

                    <h1 className="font-bold text-xl pb-3.5">News & Announcement</h1>


                    
                    <Notification
                        news = "https://cdn-icons-png.flaticon.com/128/7653/7653930.png"
                        date="10/04/2025"
                        message="Marg 1.0  An interactive session of motivating and advising for resilience and growth 15th Feb 2025 at 3.00PM"
                        />

                     
                    <Notification
                        news = "https://cdn-icons-png.flaticon.com/128/7653/7653930.png"
                        date="10/04/2025"
                        message="Marg 1.0  An interactive session of motivating and advising for resilience and growth 15th Feb 2025 at 3.00PM"
                        />

                     
                    <Notification
                        news = "https://cdn-icons-png.flaticon.com/128/7653/7653930.png"
                        date="10/04/2025"
                        message="Marg 1.0  An interactive session of motivating and advising for resilience and growth 15th Feb 2025 at 3.00PM"
                        />

                     
                    <Notification
                        news = "https://cdn-icons-png.flaticon.com/128/7653/7653930.png"
                        date="10/04/2025"
                        message="Marg 1.0  An interactive session of motivating and advising for resilience and growth 15th Feb 2025 at 3.00PM"
                        />

                   


                    <p className="flex justify-end pt-1">VIEW ALL</p>
                </div>

                    
            </div>
        </div>
    </>
}
export default MainProfile