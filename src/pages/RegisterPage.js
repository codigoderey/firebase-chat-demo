import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { createNewUser, loading, error, message, persistUser } =
    useContext(AuthContext);

  useEffect(() => {
    console.log(persistUser());
    if (!persistUser()) {
      return navigate("/admin/register");
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
      const result = await createNewUser(email, password);
      if (result === undefined) {
        return;
      } else {
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error creating user ", error);
    }
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Register to start getting chatty</h2>
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
        <input type='submit' value={loading ? "Validating..." : "Register"} />
      </form>
      <p>
        Have an account? please login {""}
        <Link to='/admin/login'>follow this link.</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
