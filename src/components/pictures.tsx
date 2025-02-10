import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectPicture } from '../actions';

const Pictures = () => {
  const pictures = useSelector((state: RootState) => state.pictures);
  const dispatch = useDispatch();

  return (
    <Container>
      {pictures.kind === 'SUCCESS' ? (
        pictures.pictures.map((picture) => (
          <Image
            key={picture.previewFormat}
            src={picture.previewFormat}
            alt={`by ${picture.author}`}
            onClick={() => dispatch(selectPicture(picture))}
          />
        ))
      ) : pictures.kind === 'LOADING' ? ( 
        <div>Loading...</div>
      ) : ( 
        <div>Error: {pictures.error}</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;

export default Pictures;