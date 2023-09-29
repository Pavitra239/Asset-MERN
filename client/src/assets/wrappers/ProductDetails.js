import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-2);
  margin-top: 1rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  justify-items: start;
  gap: 1rem;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
  }
  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .img-container img {
    width: 100%;
    height: 100%;
  }
`;

export default Wrapper;
