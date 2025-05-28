import jwt_decode from 'jwt-decode';

interface DecodedToken {
  userId: string;
  exp: number;
  iat: number;
}

 export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload; // { id, email, ... }
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

