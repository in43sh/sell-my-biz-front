import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Welcome to Sell My Biz</h1>
            <p>Your one-stop solution for buying and selling businesses.</p>
            <Link to="/sign-in">Sign in</Link>
            <Link to="/sign-up">Sign up</Link>
        </div>
    );
};

export default Home;
