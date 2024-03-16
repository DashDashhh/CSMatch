const SignupHeader = (props: {registerStatus: String}) => {
    const {registerStatus} = props
    return (
        <div className="header">
        <h1>{registerStatus}</h1>
        {/* <!-- Progress Bar --> */}
        {/* <div className="progress__bar">
            <li className="step">
                <h2 id="step--1">Step 1</h2>
            </li>
            <li className="step">
                <h2 id="step--2">Step 2</h2>
            </li>
            <li className="step">
                <h2 id="step--3">Step 3</h2>
            </li>
        </div> */}
    </div>
    );
}
 
export default SignupHeader;