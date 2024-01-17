import React, { useContext, useEffect } from "react";
import { TemplateContext } from "../context/TemplateContext";
import "./loading.css";

function LoadingItemOrder() {
  const { handleUpstreamOrder } = useContext(TemplateContext);

  useEffect(() => {
    const streamOrder = async (e) => {
      await handleUpstreamOrder(e);
    };
    streamOrder();
  }, []);

  return (
    <div className="loading_wrapper">
      <ul className="loading_content">
        <li>
          <span className="loading_text">Loading</span>
        </li>
        <li className="classic_circ">
          <span className=" circ_red"></span>
          <span className=" circ_green"></span>
          <span className=" circ_blue"></span>
        </li>
      </ul>
    </div>
  );
}

export default LoadingItemOrder;
