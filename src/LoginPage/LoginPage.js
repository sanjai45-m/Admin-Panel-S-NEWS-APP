import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import './LoginPage.css';

const validationSchema = Yup.object({
  username: Yup.string().email('Invalid email address').required('Email  is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      await signInWithEmailAndPassword(auth, values.username, values.password);
      localStorage.setItem('authToken', 'your-auth-token'); // Store token in localStorage
      navigate('/user-list'); // Navigate to the UsersList page upon successful login
    } catch (error) {
      setErrors({ general: error.message });
      setSubmitting(false);
    }
  };

  return (
    
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">Email</label>
                <Field type="text" id="username" name="username" className="form-control" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              {errors.general && <div className="error general-error">{errors.general}</div>}

              <button type="submit" className="submit-button" disabled={isSubmitting}>Login</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
