import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const FacebookAuth = () => {
    const responseFacebook = (response) => {
        console.log("User Info by login with Facebook:", response);
    }

    return ( 
        <FacebookLogin
            appId="1754556121784073"
            autoLoad={true}
            fields="name,email,picture"
            callback={responseFacebook}
            render={(renderProps) => (
                <button onClick={renderProps.onClick} className="social-btn" type="button">
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                        alt="Facebook logo"
                        className="icon"
                    />
                    Sign in with Facebook
                </button>
            )}
        />
    );
}
 
export default FacebookAuth;