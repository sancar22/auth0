import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  
  const { logout } = useAuth0();


  const navigate = useNavigate();

  useEffect(() => {
    // initially isAuthenticated is always false, we need to make sure it's not loading
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isLoading, isAuthenticated])

  console.log(user, isAuthenticated, isLoading, 'here');

  const authenticatedAPI = async () => {
    const token = await getAccessTokenSilently();

    const res = await fetch(('http://localhost:5001/authenticated'), {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    
    console.log(token, 'token here');

    console.log(data, 'data here');
  };

  const unauthenticatedAPI = async () => {

    const res = await fetch('http://localhost:5001/');

    const data = await res.json();
    
    console.log(data, 'data here');
  };

  return (
    <div>
      <button onClick={authenticatedAPI}>
        Authenticated API
      </button>
      <button onClick={unauthenticatedAPI}>
        unauthenticated API
      </button>
      <button onClick={() => logout({ returnTo: 'http://localhost:5173/'})}> {/* Also add it to your settings in auth0 */}
        Log Out
      </button>
    </div>
  )
}

export default Home
