import './Styles/WelcomeScreen.css';
import logo from './logo.png';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
    (<div className="WelcomeScreen">
        <img className='welcome-logo' alt='logo' src={logo} />
        <div className="google-btn">
            <div className='google-icon-container'>
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google sign-in"/>
            </div>
            <button onClick={() => { props.getAccessToken() }} rel="nofollow noopener" className="btn-text"><b>Sign in with google</b></button>
        </div>
        <a className='private-policy' href="https://krishokr.github.io/meet/privacy.html" rel="nofollow noopener">Privacy policy</a>
    </div>) : null
}


export default WelcomeScreen;

