import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-2);
  padding: 1rem;
  margin: 1rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 500px and max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  .checkbox {
    display: flex;
    align-items: center;
    justify-content: start;
    grid-column-gap: 1rem;
  }
`;

export default Wrapper;
