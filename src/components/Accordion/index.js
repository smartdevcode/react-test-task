/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import "./styles.scss";
import withCollapse from "../withCollapse";
import { NodeContext } from "../../contexts/NodeContext";

function Accordion({ isOpen, setIsOpen, title, children, handleOpen, index }) {
  const { hideTree, setHideTree } = useContext(NodeContext);

  useEffect(() => {
    if (hideTree === index) {
      setIsOpen((prev) => false);
      setHideTree(-1);
    }
  }, [hideTree]);

  const handleClick = () => {
    if (children === undefined || children.length === 0) {
      setHideTree(index);
    } else {
      handleOpen();
    }
  };

  return (
    <div className="Accordion">
      <div>
        <div className="titleContainer">
          <h4 onClick={handleClick}>{title}</h4>
        </div>
      </div>
      <div className="childrenContainer">
        <div>{isOpen && <div className="child">{children}</div>}</div>
      </div>
    </div>
  );
}

const ExtendedAccordion = withCollapse(Accordion);

export default ExtendedAccordion;
