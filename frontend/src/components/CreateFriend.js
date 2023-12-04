import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateFriend.css';

// Define the MBTI types and their corresponding button colors
const mbtiTypes = [
  { types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'], color: 'lightpurple' },
  { types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'], color: 'lightgreen' },
  { types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'], color: 'lightyellow' },
  { types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'], color: 'lightblue' },
];

function CreateFriend() {
  // ... existing state variables ...
    const [selectedType, setSelectedType] = useState(null);
    const [selectedTrait, setSelectedTrait] = useState('');
    const [virtualFriendName, setVirtualFriendName] = useState('');
    const [customPrompt, setCustomPrompt] = useState(''); // State for custom prompt
    const [isReadyToChat, setIsReadyToChat] = useState(false);
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [avatarUrl, setAvatarUrl] = useState('/avatars/default-avatar.png'); // Initialize with default avatar path
    const username = localStorage.getItem('username');
    const [isLoading, setIsLoading] = useState(false);

  // ... other existing code ...


  useEffect(() => {
    setIsReadyToChat(!!(selectedType && selectedTrait && virtualFriendName.trim()));
    // Update the avatar URL when a new type or trait is selected
    if (selectedType && selectedTrait) {
      setAvatarUrl(`/avatars/${selectedType}-${selectedTrait}.png`);
    } else {
      setAvatarUrl('/avatars/default-avatar.png');
    }
  }, [selectedType, selectedTrait, virtualFriendName]);

  // ... existing handler functions ...
    const handleTypeClick = (type) => {
    setSelectedType(type);
    setVirtualFriendName('');
    setSelectedTrait('');
    setCustomPrompt('');
    };

    const handleTraitClick = (trait) => {
      setSelectedTrait(trait);
      setVirtualFriendName('');
      setCustomPrompt('');
    };

    const handleGenerateAvatar = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/virtualfriend/generate-avatar/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    friendName: virtualFriendName,
                    username: username,
                    customPrompt: customPrompt
                }),
            });
            if (response.ok) {
                const data = await response.json();
                const newAvatarUrl = `http://localhost:8000/media/${data.image_path}`; 
                setAvatarUrl(newAvatarUrl); 
                // setAvatarUrl(data.image_path); // Update the avatarUrl state with the new path
                console.log("data.image_path", data.image_path);
            } else {
                console.error('Failed to generate avatar');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setIsLoading(false);
    };
    // const startChat = () => {
    //   // Navigate to the chatbot page with state
    //   navigate('/chatbot', { state: { selectedType, selectedTrait, virtualFriendName, customPrompt, avatarUrl} });
    // };

    const createVirtualFriend = async () => {
      try {
        const response = await fetch('http://localhost:8000/virtualfriend/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username, // assuming you have the username in the state or from localStorage
            friend_name: virtualFriendName,
            friend_mbti: selectedType,
            friend_mbti_variant: selectedTrait,
            friend_custom_prompt: customPrompt,
            friend_avatar: avatarUrl,
          }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to create virtual friend');
        }
    
        return await response.json(); // You can use the response data as needed
      } catch (error) {
        console.error('Error creating virtual friend:', error);
      }
    };
    

    const startChat = async () => {
      await createVirtualFriend(); // Create the virtual friend
    
      // Navigate to the chatbot page with state
      navigate('/chatbot', { 
        state: { 
          selectedType, 
          selectedTrait, 
          virtualFriendName, 
          customPrompt, 
          avatarUrl 
        } 
      });
    };

    const backtoDash = async () => {
      // Navigate to the chatbot page with state
      navigate(`/dashboard/${username}/`);
    };
    
  
    // Conditional rendering for avatar path
    const avatarPath = selectedType && selectedTrait
      ? `/avatars/${selectedType}-${selectedTrait}.png`
      : '/avatars/default-avatar.png';

  // ... existing JSX ...

    return (
      <div className="create-friend-container">
        <div className="selection-container">
          <div className="mbti-types">
            {mbtiTypes.map((group, index) => (
              <div key={index} className="mbti-row">
                {group.types.map((type) => (
                  <button
                    key={type}
                    className={`mbti-button ${group.color} ${selectedType === type ? 'selected' : ''}`}
                    onClick={() => handleTypeClick(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="traits">
            <button 
              className={`trait-button ${selectedTrait === 'Assertive' ? 'selected' : ''}`}
              onClick={() => handleTraitClick('Assertive')}
            >
              Assertive
            </button>
            <button 
              className={`trait-button ${selectedTrait === 'Turbulent' ? 'selected' : ''}`}
              onClick={() => handleTraitClick('Turbulent')}
            >
              Turbulent
            </button>
          </div>
          <div className="back-to-dash">
            <button 
              className={"dash-button"}
              onClick={() => backtoDash()}
            >
              Go Back to Dashboard
            </button>
          </div>
        </div>
        <div className="avatar-and-name-container">
          <div className="avatar-display">
              <img src={avatarUrl} alt="Avatar" /> 
              </div>
              <input 
                  type="text"
                  placeholder="Name your virtual friend"
                  className="friend-name-input"
                  value={virtualFriendName}
                  onChange={(e) => setVirtualFriendName(e.target.value)}
              />
               <textarea
                  placeholder="Customize your virtual friend"
                  className="custom-prompt-input"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={9} // You can adjust the number of rows as needed
              />
              <button className="generate-avatar-button" onClick={handleGenerateAvatar}>
                  Generate Virtual Friend Avatar with DALL-E 3
              </button>
              {isLoading && <div>Loading...</div>} {/* Loading indicator */}
              {isReadyToChat && (
                  <button className="start-chat-button" onClick={startChat}>
                      Start Chat
                  </button>
              )}
        </div>
      </div>
    );
  }

export default CreateFriend;













// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CreateFriend.css';

// // Define the MBTI types and their corresponding button colors
// const mbtiTypes = [
//   { types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'], color: 'lightpurple' },
//   { types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'], color: 'lightgreen' },
//   { types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'], color: 'lightyellow' },
//   { types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'], color: 'lightblue' },
// ];

// function CreateFriend() {
//   // ... existing state variables ...
//     const [selectedType, setSelectedType] = useState(null);
//     const [selectedTrait, setSelectedTrait] = useState('');
//     const [virtualFriendName, setVirtualFriendName] = useState('');
//     const [isReadyToChat, setIsReadyToChat] = useState(false);
//     const navigate = useNavigate(); // Hook to navigate programmatically
//     const [avatarUrl, setAvatarUrl] = useState('/avatars/default-avatar.png'); // Initialize with default avatar path
//     const username = localStorage.getItem('username');

//   // ... other existing code ...


//     useEffect(() => {
//       setIsReadyToChat(!!(selectedType && selectedTrait && virtualFriendName.trim()));
//     }, [selectedType, selectedTrait, virtualFriendName]);

//   // ... existing handler functions ...
//     const handleTypeClick = (type) => {
//     setSelectedType(type);
//     setVirtualFriendName('');
//     setSelectedTrait('');
//     };

//     const handleTraitClick = (trait) => {
//       setSelectedTrait(trait);
//       setVirtualFriendName('');
//     };

//     const handleGenerateAvatar = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/virtualfriend/generate-avatar/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     friendName: virtualFriendName,
//                     username: username
//                 }),
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 const newAvatarUrl = `http://localhost:8000/media/${data.image_path}`; 
//                 setAvatarUrl(newAvatarUrl); 
//                 // setAvatarUrl(data.image_path); // Update the avatarUrl state with the new path
//                 console.log("data.image_path", data.image_path);
//             } else {
//                 console.error('Failed to generate avatar');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };
//     const startChat = () => {
//       // Navigate to the chatbot page with state
//       navigate('/chatbot', { state: { selectedType, selectedTrait, virtualFriendName } });
//     };
  
//     // Conditional rendering for avatar path
//     const avatarPath = selectedType && selectedTrait
//       ? `/avatars/${selectedType}-${selectedTrait}.png`
//       : '/avatars/default-avatar.png';

//   // ... existing JSX ...

//     return (
//       <div className="create-friend-container">
//         <div className="selection-container">
//           <div className="mbti-types">
//             {mbtiTypes.map((group, index) => (
//               <div key={index} className="mbti-row">
//                 {group.types.map((type) => (
//                   <button
//                     key={type}
//                     className={`mbti-button ${group.color} ${selectedType === type ? 'selected' : ''}`}
//                     onClick={() => handleTypeClick(type)}
//                   >
//                     {type}
//                   </button>
//                 ))}
//               </div>
//             ))}
//           </div>
//           <div className="traits">
//             <button 
//               className={`trait-button ${selectedTrait === 'Assertive' ? 'selected' : ''}`}
//               onClick={() => handleTraitClick('Assertive')}
//             >
//               Assertive
//             </button>
//             <button 
//               className={`trait-button ${selectedTrait === 'Turbulent' ? 'selected' : ''}`}
//               onClick={() => handleTraitClick('Turbulent')}
//             >
//               Turbulent
//             </button>
//           </div>
//         </div>
//         <div className="avatar-and-name-container">
//           <div className="avatar-display">
//               <img src={avatarUrl} alt="Avatar" /> 
//               </div>
//               <input 
//                   type="text"
//                   placeholder="Name your virtual friend"
//                   className="friend-name-input"
//                   value={virtualFriendName}
//                   onChange={(e) => setVirtualFriendName(e.target.value)}
//               />
//               <button className="generate-avatar-button" onClick={handleGenerateAvatar}>
//                   Generate Virtual Friend Avatar with DALL-E 3
//               </button>
//               {isReadyToChat && (
//                   <button className="start-chat-button" onClick={startChat}>
//                       Start Chat
//                   </button>
//               )}
//         </div>
//       </div>
//     );
//   }

// export default CreateFriend;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
// import './CreateFriend.css'; // Make sure to link the correct CSS file

// // Define the MBTI types and their corresponding button colors
// const mbtiTypes = [
//   { types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'], color: 'lightpurple' },
//   { types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'], color: 'lightgreen' },
//   { types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'], color: 'lightyellow' },
//   { types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'], color: 'lightblue' },
// ];

// function CreateFriend() {
//   const [selectedType, setSelectedType] = useState(null);
//   const [selectedTrait, setSelectedTrait] = useState('');
//   const [virtualFriendName, setVirtualFriendName] = useState('');
//   const [isReadyToChat, setIsReadyToChat] = useState(false);
//   const navigate = useNavigate(); // Hook to navigate programmatically

//   useEffect(() => {
//     // Update the isReadyToChat state based on the current selections
//     setIsReadyToChat(!!(selectedType && selectedTrait && virtualFriendName.trim()));
//   }, [selectedType, selectedTrait, virtualFriendName]);

//   const handleTypeClick = (type) => {
//     setSelectedType(type);
//     setVirtualFriendName('');
//     setSelectedTrait('');
//   };

//   const handleTraitClick = (trait) => {
//     setSelectedTrait(trait);
//     setVirtualFriendName('');
//   };

//   const startChat = () => {
//     // Navigate to the chatbot page with state
//     navigate('/chatbot', { state: { selectedType, selectedTrait, virtualFriendName } });
//   };

//   // Conditional rendering for avatar path
//   const avatarPath = selectedType && selectedTrait
//     ? `/avatars/${selectedType}-${selectedTrait}.png`
//     : '/avatars/default-avatar.png';

//   return (
//     <div className="create-friend-container">
//       <div className="selection-container">
//         <div className="mbti-types">
//           {mbtiTypes.map((group, index) => (
//             <div key={index} className="mbti-row">
//               {group.types.map((type) => (
//                 <button
//                   key={type}
//                   className={`mbti-button ${group.color} ${selectedType === type ? 'selected' : ''}`}
//                   onClick={() => handleTypeClick(type)}
//                 >
//                   {type}
//                 </button>
//               ))}
//             </div>
//           ))}
//         </div>
//         <div className="traits">
//           <button 
//             className={`trait-button ${selectedTrait === 'Assertive' ? 'selected' : ''}`}
//             onClick={() => handleTraitClick('Assertive')}
//           >
//             Assertive
//           </button>
//           <button 
//             className={`trait-button ${selectedTrait === 'Turbulent' ? 'selected' : ''}`}
//             onClick={() => handleTraitClick('Turbulent')}
//           >
//             Turbulent
//           </button>
//         </div>
//       </div>
//       <div className="avatar-and-name-container">
//         <div className="avatar-display">
//           <img src={avatarPath} alt="Avatar" />
//         </div>
//         <input 
//           type="text" 
//           placeholder="Name your virtual friend" 
//           className="friend-name-input"
//           value={virtualFriendName}
//           onChange={(e) => setVirtualFriendName(e.target.value)}
//         />
//         {isReadyToChat && (
//           <button className="start-chat-button" onClick={startChat}>
//             Start Chat
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default CreateFriend;


// function CreateFriend() {
//     // ... existing state variables ...
//     const [selectedType, setSelectedType] = useState(null);
//     const [selectedTrait, setSelectedTrait] = useState('');
//     const [virtualFriendName, setVirtualFriendName] = useState('');
//     const [isReadyToChat, setIsReadyToChat] = useState(false);
//     const navigate = useNavigate(); // Hook to navigate programmatically
//     const [avatarUrl, setAvatarUrl] = useState(''); // State to store the generated avatar URL
//     const username = localStorage.getItem('username');
//     // console.log("username", username);


//     useEffect(() => {
//         setIsReadyToChat(!!(selectedType && selectedTrait && virtualFriendName.trim()));
//     }, [selectedType, selectedTrait, virtualFriendName]);

//     // ... existing handler functions ...
//     const handleTypeClick = (type) => {
//       setSelectedType(type);
//       setVirtualFriendName('');
//       setSelectedTrait('');
//     };
  
//     const handleTraitClick = (trait) => {
//       setSelectedTrait(trait);
//       setVirtualFriendName('');
//     };
  
//     const handleGenerateAvatar = async () => {
//         try {
//             const response = await fetch('http://localhost:8000/virtualfriend/generate-avatar/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({

//                     friendName: virtualFriendName,
//                     username: username// Add other required data if necessary
//                 }),
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setAvatarUrl(data.image_path); // Update the state with the new avatar URL
//             } else {
//                 console.error('Failed to generate avatar');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };
//     const startChat = () => {
//       // Navigate to the chatbot page with state
//       navigate('/chatbot', { state: { selectedType, selectedTrait, virtualFriendName } });
//     };
  
//     // Conditional rendering for avatar path
//     const avatarPath = selectedType && selectedTrait
//       ? `/avatars/${selectedType}-${selectedTrait}.png`
//       : '/avatars/default-avatar.png';

//     // ... existing JSX ...

//     return (
//       <div className="create-friend-container">
//         <div className="selection-container">
//           <div className="mbti-types">
//             {mbtiTypes.map((group, index) => (
//               <div key={index} className="mbti-row">
//                 {group.types.map((type) => (
//                   <button
//                     key={type}
//                     className={`mbti-button ${group.color} ${selectedType === type ? 'selected' : ''}`}
//                     onClick={() => handleTypeClick(type)}
//                   >
//                     {type}
//                   </button>
//                 ))}
//               </div>
//             ))}
//           </div>
//           <div className="traits">
//             <button 
//               className={`trait-button ${selectedTrait === 'Assertive' ? 'selected' : ''}`}
//               onClick={() => handleTraitClick('Assertive')}
//             >
//               Assertive
//             </button>
//             <button 
//               className={`trait-button ${selectedTrait === 'Turbulent' ? 'selected' : ''}`}
//               onClick={() => handleTraitClick('Turbulent')}
//             >
//               Turbulent
//             </button>
//           </div>
//         </div>
//         <div className="avatar-and-name-container">
//           <div className="avatar-display">
//               <img src={avatarUrl || avatarPath} alt="Avatar" />
//               </div>
//               <input 
//                   type="text"
//                   placeholder="Name your virtual friend"
//                   className="friend-name-input"
//                   value={virtualFriendName}
//                   onChange={(e) => setVirtualFriendName(e.target.value)}
//               />
//               <button className="generate-avatar-button" onClick={handleGenerateAvatar}>
//                   Generate Virtual Friend Avatar with DALL-E 3
//               </button>
//               {isReadyToChat && (
//                   <button className="start-chat-button" onClick={startChat}>
//                       Start Chat
//                   </button>
//               )}
//         </div>
//       </div>
//     );
//   }

// export default CreateFriend;
        // <div className="create-friend-container">
        //     {/* ... existing JSX ... */}
        //     <div className="avatar-and-name-container">
        //         <div className="avatar-display">
        //             <img src={avatarUrl || avatarPath} alt="Avatar" />
        //         </div>
        //         <input 
        //             type="text"
        //             placeholder="Name your virtual friend"
        //             className="friend-name-input"
        //             value={virtualFriendName}
        //             onChange={(e) => setVirtualFriendName(e.target.value)}
        //         />
        //         <button className="generate-avatar-button" onClick={handleGenerateAvatar}>
        //             Generate Virtual Friend Avatar with DALL-E 3
        //         </button>
        //         {isReadyToChat && (
        //             <button className="start-chat-button" onClick={startChat}>
        //                 Start Chat
        //             </button>
        //         )}
        //     </div>
        // </div>
    // );
