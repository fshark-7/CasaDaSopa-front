import styled from 'styled-components';

export const GaleryContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const Photo = styled.div`
    width: 280px;

    @media only screen and (max-width: 480px){
        width: 320px;
    }
`;

export const PhotoArea = styled.div`
    margin: 10px;
    width: 260px;
    height: 160px;

    img{
        width: inherit;
        height: inherit;
    }

    @media only screen and (max-width: 480px){
        width: 300px;
        height: 190px;
    }
`;

export const MostGalery = styled.div`
    text-align: center;
    margin-top: 24px;
    font-size: 16px;
    font-weight: 500;

    cursor: pointer;
    &:hover{
        color: ${({ theme }) => theme.colors.primary.main};
    }
`;
