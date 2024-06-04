export default function Profile(){

    return(
        <div className="container my-5">
            <div className="d-flex flex-row justify-content-between align-items-center">
                <p className="m-0">Profile</p>
                <button>save</button>
            </div>
            <br/>
            <div className="d-flex">
                <img alt="profilePicture" src="#"/>
                <button>Change Photo</button>
                <button>Delete</button>
            </div>
            <div className="row">
                <p>Newsletter</p>
                <div className="d-flex justify-content-between">
                    <p>you are currently subscribe to our newsLetter</p>
                    <button>Unsubscribe</button>
                </div>
            </div>
            <div className="row">
                <p>signOut</p>
                <p>Delete Account</p>
            </div>
        </div>
    )
}