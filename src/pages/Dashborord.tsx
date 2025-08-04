import { authContext } from "@/context/authContext";
import { useContext } from "react";

const Dashborord = () => {
  const { session } = useContext(authContext);
  console.log(session);

  return (
    <div>
      {session ? (
        <>
          <h1>Welcome, {session.user.user_metadata.displayName}</h1>
        </>
      ) : (
        <h1>Please log in to access the dashboard</h1>
      )}
      {/* Add more dashboard content here */}
    </div>
  );
};

export default Dashborord;
