import React, { useState } from "react";

const withCollapse =
  (Component) =>
  ({ ...props }) => {
    const [isOpen, setIsOpen] = useState(props.open);

    const handleOpen = () => {
      setIsOpen((previous) => !previous);
    };

    return (
      <Component
        {...props}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleOpen={handleOpen}
      />
    );
  };

export default withCollapse;
