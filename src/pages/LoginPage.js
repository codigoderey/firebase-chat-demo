import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser, loading, error, message, persistUser } =
    useContext(AuthContext);

  useEffect(() => {
    console.log(persistUser());
    if (!persistUser()) {
      return navigate("/admin/login");
    } else {
      return navigate("/chat");
    }
    //eslint-disable-next-line
  }, []);

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = newUser;
      const result = await loginUser(email, password);
      console.log(result);
      if (result === undefined) {
        return;
      } else {
        navigate("/chat");
      }
    } catch (error) {}
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Login to start getting chatty</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={newUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type='new-password'
            name='password'
            placeholder='Password'
            value={newUser.password}
            onChange={handleInputChange}
          />
        </div>
        {error && <p className='alert-error'>{message}</p>}
        <input type='submit' value={loading ? "Validating..." : "Login"} />
      </form>
      <p>
        Does not have an account? please register {""}
        <Link to='/admin/register'>follow this link.</Link>
      </p>
    </div>
  );
};

export default LoginPage;
