import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import axios from "axios";

export const ProfilePage = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createUser = async () => {
      try {
        const token = await getAccessTokenSilently();  // Get Auth0 JWT token
        const userData = {
          email: user.email,
          given_name: user.given_name,
          family_name: user.family_name,
          sub: user.sub,
        };
        console.log(userData)
        // Send a request to the backend to create the user
        await axios.post('http://localhost:6060/api/messages/create-user/', userData, {
          headers: {
            Authorization: `Bearer ${token}`,  // Include token in the request headers
            'Content-Type': 'application/json',
          },
        });

        setLoading(false);  // Done loading once user is created or confirmed

      } catch (error) {
        console.error('Error creating user:', error);
      }
    };

    createUser();  // Trigger user creation on page load
  }, [getAccessTokenSilently, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Profile Page
        </h1>
        <div className="content__body">
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
            <h2 className="profile__title1">User Details</h2> 
            <div className="profile__container">
            <div className="profile__wrapper">
            <div className="profile__body">
            <ul className="profile__info-list">
              <li><strong>Given Name:</strong> {user.given_name}</li>
              <li><strong>Family Name:</strong> {user.family_name}</li>
              <li><strong>Nickname:</strong> {user.nickname}</li>
              <li><strong>Full Name:</strong> {user.name}</li>
              <li><strong>Email:</strong> {user.email}</li>
              <li><strong>Email Verified:</strong> {user.email_verified ? 'Yes' : 'No'}</li>
              <li><strong>Auth0 User ID:</strong> {user.sub}</li>
              <li><strong>Last Updated:</strong> {new Date(user.updated_at).toLocaleString()}</li>
            </ul>
              {/* <CodeSnippet
                title="User Info"
                code={JSON.stringify(user, null, 2)}
              /> */}
               </div>
               </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
