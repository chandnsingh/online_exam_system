function ProfileDetails({
    heading = "heading",
    title = "title"
}) {
    return <>
        
        <p className="font-extralight">{heading}</p>
        <h2 className="mb-4 text-m font-semibold">{title}</h2>
    </>
}
export default ProfileDetails