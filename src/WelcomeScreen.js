import './Styles/WelcomeScreen.css';
import logo from './logo.png';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
    (<div className="WelcomeScreen">
        <img className='welcome-logo' alt='logo' src={logo} />
        <div className="button_cont" align="center">
            <div class="google-btn">
                <div class="google-icon-wrapper">
                    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google sign-in"/>
                    
                 </div>
                <button onClick={() => { props.getAccessToken() }} rel="nofollow noopener" class="btn-text"><b>Sign in with google</b></button>
            </div>
        </div>
        <a href="https://krishokr.github.io/meet/privacy.html" rel="nofollow noopener">Privacy policy</a>
    </div>) : null
}


export default WelcomeScreen;

