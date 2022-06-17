import styled from "styled-components";

export const Styles = styled.div`
  .cards-details {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin: 0 auto;
    max-width: 100%;
    background-color:  ${({ theme }) => theme.bg1};
    border-radius: 6px;
    height:950px;

    @media (min-width: 950px) {
      max-width: 1170px;
    }
    @media (min-width: 1150px) {
      max-width: 1600px;
    }
    a {
      text-decoration: none;
      .back-button {
        display: flex;
        padding: 8px 20px;
        margin: 2rem 2rem 3rem;
        background-color:  ${({ theme }) => theme.bg2};
        color:  ${({ theme }) => theme.text1};
        border: none;
        box-shadow:  ${({ theme }) => theme.box_shadow3};

        img {
          width: 1rem;
          margin-right: 5px;
        }
         @media (min-width: 950px) {
                padding: 12px 30px;
                font-size:1rem;
                font-weight:600;

      }
      }
    }

    .content {
      width: 100%;
      align-items: center;
      margin: 1rem;
      color:  ${({ theme }) => theme.text1};
      .card-img {
        width: 90%;
        height: auto;
        @media (min-width: 950px) {
        width: 50%;
      }
      }

      .card-body {
        margin: 1rem 1.5rem;
       
        p {
          font-size: 1.2rem;
          margin-top: 0.5rem;
        }
        span {
          font-weight: lighter;
          margin-left: 0.5rem;
        }
        .borders{
          cursor:pointer;
          color: ${({ theme }) => theme.text1}
         
        }
        .card-info {
          padding-top: 2rem;
          padding-left: 10px;
        }
         @media (min-width: 950px) {
        margin:0 1rem;
        }
      } 
      @media (min-width: 950px) {
        display:flex;
        flex-direction: row;
        margin: 2rem;
     
      }
    
  }
`;
