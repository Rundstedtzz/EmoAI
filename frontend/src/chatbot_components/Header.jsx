// import React from "react";

// export default function Header() {
//   return <div className="header_friend">&nbsp;Chat with your virtual friend!</div>;
// }

import React from "react";
import './styles.css';

export default function Header({ friendName }) {
  return (
    <div className="header_friend">
      &nbsp;Chat with {friendName || "your virtual friend"}!
    </div>
  );
}
