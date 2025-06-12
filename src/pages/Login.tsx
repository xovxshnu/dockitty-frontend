// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("token");

//     if (token) {
//       localStorage.setItem("token", token);
//       navigate("/upload"); // or any protected route
//     }
//   }, []);

//   const handleGoogleLogin = () => {
//     window.location.href = "https://dockitty-backend-production.up.railway.app/api/auth/google";
//   };

//   return (
//     <div>
//       <h1>Login to Dockitty</h1>
//       <button onClick={handleGoogleLogin}>Sign in with Google</button>
//     </div>
//   );
// };

// export default LoginPage;
