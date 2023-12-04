import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const { username } = useParams(); // Extract username from URL
  const [user, setUser] = useState(null); // State to store user data
  const [friends, setFriends] = useState([]); // State to store friends data

  console.log("friends", friends)
  useEffect(() => {
    // Fetch user-specific data using the username and token
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Retrieve the stored token
      if (token) {
        try {
          const response = await fetch(`http://localhost:8000/dashboard/${username}/`, { // Make sure the endpoint is correct
            headers: {
              'Authorization': `Token ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            console.log("API Response Data:", data);  // Check what's being returned
            setUser(data.user);
            console.log("User", user)
            setFriends(data.friends);
          } else {
            console.error('Failed to fetch data');
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle errors here, like showing a message to the user
        }
      }
    };

    fetchData();
  }, [username]); // Re-fetch when userId changes

  // Handler for the button click
  const handleCreateFriendClick = () => {
    navigate('/create-friend'); // Navigate to the create-friend route
  };

  const handleAvatarClick = (friend) => {
    navigate('/chatbot', { 
      state: { 
        selectedType: friend.mbti, 
        selectedTrait: friend.mbti_variant, 
        virtualFriendName: friend.name, 
        customPrompt: friend.custom_prompt, 
        avatarUrl: friend.avatar
      } 
    });
  };
  
  // If user data has not been loaded, you can render a loading state or return null
  if (!user) {
    return <div>Loading...</div>; // Or any other loading state indicator
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-overlay"></div>
      <div className="dashboard-content">
        <section className="user-profile">
          {user.avatar && (
            <img src={`{/avatar/${user.avatar}}`} alt={`Avatar of ${user.name}`} className="user-avatar" />
          )}
          <div>
           <h1 style={{ textAlign: 'left', display: 'block' }} className = "username-dash">{user.username}</h1>
           <h2 style={{ textAlign: 'left', display: 'block' }} className = "mbti-dash">MBTI: {user.mbti}-{user.mbti_variant}</h2>
          </div>
        </section>

        <section className="virtual-friends-section">
            <h1>Your Virtual Friends</h1>
            <div className="friends-list">
                {/* {friends.map((friend, index) => (
                    <div key={index} className="friend"> 
                        {friend.avatar && (
                          <img src={`${friend.avatar}`} alt={`Avatar of ${friend.name}`} className="friend-avatar" />
                        )}
                        <h4>{friend.name}</h4>
                        <h4>MBTI: {friend.mbti}-{friend.mbti_variant.charAt(0)}</h4>
                        <div className="custom_prompt">Custom Prompt: {friend.custom_prompt}</div>
                    </div>
                ))} */}
                {friends.map((friend, index) => (
                  <div key={index} className="friend"> 
                    {friend.avatar && (
                      <img 
                        src={`${friend.avatar}`} 
                        alt={`Avatar of ${friend.name}`} 
                        className="friend-avatar"
                        onClick={() => handleAvatarClick(friend)}
                      />
                    )}
                    <h2>{friend.name}</h2>
                    <h4>MBTI: {friend.mbti}-{friend.mbti_variant.charAt(0)}</h4>
                    <div className="custom_prompt">{friend.custom_prompt}</div>
                  </div>
                ))}
            </div>
        </section>



        <button className="create-friend-button" onClick={handleCreateFriendClick}>
          Create New Virtual Friend
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
