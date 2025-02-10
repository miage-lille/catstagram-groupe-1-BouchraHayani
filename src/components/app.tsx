import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import Counter from './counter';
import Pictures from './pictures';
import ModalPortal from './modal';
import { closeModal, fetchCatsRequest } from '../actions';
import * as O from 'fp-ts/Option';

const App = () => {
  const dispatch = useDispatch();
  const pictureSelected = useSelector((state: RootState) => state.pictureSelected);

  useEffect(() => {
    dispatch(fetchCatsRequest(3));
  }, [dispatch]);

  return (
    <div>
      <Counter />
      <Pictures />
      {O.isSome(pictureSelected) && (
        <ModalPortal
          largeFormat={pictureSelected.value.largeFormat}
          close={() => dispatch(closeModal())}
        />
      )}
    </div>
  );
};

export default App;