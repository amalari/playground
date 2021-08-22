import StaffNavbar from "../Navbars/StaffNavbar";

const Staff = (props) => {
    return (
        <div className="main-content">
            <StaffNavbar />
            {props.children}
        </div>
    )
}

export default Staff;