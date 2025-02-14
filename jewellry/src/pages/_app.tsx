import '../styles/globals.css';
import Layout from "../../Layout/Layout";
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { Toaster } from 'react-hot-toast';
import { Link } from 'lucide-react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
      <Toaster position="top-right" reverseOrder={false} />
  <Link href="/admin" className="text-gray-700 hover:text-red-700 ">
              Admin
            </Link>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
