// AdminLoginForm.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../../firebase'; // Ensure Firebase auth import is correct
import { getDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../../../firebase'; // Ensure you export db from your Firebase config

const AdminLoginForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    adminEmail: '',
    adminPassword: '',
  };

  const validationSchema = Yup.object({
    adminEmail: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    adminPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.adminEmail, values.adminPassword);
      const user = userCredential.user;
      
      // Check if the user is admin
      const adminDoc = await getDoc(doc(db, "admin", user.uid)); // Use db to get the admin document
      if (adminDoc.exists() && adminDoc.data().isAdmin) {
        navigate('/admin/overview');
      } else {
        toast.error('Not authorized as admin');
      }
    } catch (error) {
      toast.error('Login failed: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">Email</label>
                <Field type="email" name="adminEmail" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                <ErrorMessage name="adminEmail" component="div" className="text-red-600 text-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">Password</label>
                <Field type="password" name="adminPassword" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                <ErrorMessage name="adminPassword" component="div" className="text-red-600 text-sm" />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white p-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLoginForm;
