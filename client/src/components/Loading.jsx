import styled, { keyframes } from "styled-components";

const loading = keyframes`
    from {
        opacity: 100;
    }
    to {
        opacity: 0;
    }
`;

const Load = styled.div`
  margin-top: -2.5rem;
  width: 8rem;
  span {
    font-size: 5rem;
    color: var(--primary-500);
    margin-right: 1rem;
    opacity: 0;
  }
  .dot-1 {
    animation: ${loading} 0.75s infinite linear;
  }
  .dot-2 {
    animation: ${loading} 0.75s 0.25s infinite linear;
  }
  .dot-3 {
    animation: ${loading} 0.75s 0.5s infinite linear;
  }
`;

const Loading = () => {
  return (
    <Load>
      <span className="dot-1">.</span>
      <span className="dot-2">.</span>
      <span className="dot-3">.</span>
    </Load>
  );
};
export default Loading;
