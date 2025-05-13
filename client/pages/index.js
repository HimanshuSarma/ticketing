import axios from "axios";
import buildClient from "../api/buildClient";

const LandingPage = (props) => {

  console.log(props, "LandingPage")

  return (
    <>
      {props?.currentUser ? (
        "You are signed in"
      ) : (
        "You are not signed in"
      )}
    </>
  )
};

LandingPage.getInitialProps = async (context) => {
  try {
    const response = await buildClient(context).get(
      `/api/users/currentuser`
    );
    console.log(response?.data, "getInitialProps")
    return (response?.data);
  } catch (err) {
    console.log(err, "getInitialPropsError");
    return err?.response?.data;
  }
  
};

export default LandingPage;