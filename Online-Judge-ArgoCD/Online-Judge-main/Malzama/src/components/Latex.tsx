import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
      MathJax: any;
    }
  }

function Latex(props: { children: React.ReactNode }) {
  const node = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (node.current) {
      window.MathJax.typesetPromise([node.current]);
    }
  }, [props.children]);

  return (
    <div ref={node} data-color-mode="light">
      {props.children}
    </div>
    
  );
}

export default Latex;
