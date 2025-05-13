import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/buildClient";
import Header from "../components/Header";

const AppComponent = ({ Component, pageProps }) => {
  return (
    <>
      <Header currentUser={pageProps?.currentUser} />
      <Component {...pageProps} />
    </>
  )
}

AppComponent.getInitialProps = async (context) => {
  try {
    const response = await buildClient(context?.ctx).get(
      `/api/users/currentuser`
    );

    let pageProps = {};
    if (context?.Component?.getInitialProps) {
      pageProps = await context.Component.getInitialProps(context.ctx);
    }

    return {
      pageProps,
      ...response?.data
    } || {};
  } catch (err) {
    console.log(err, "getInitialPropsError");
    return err?.response?.data || {};
  }
  
};


export default AppComponent;