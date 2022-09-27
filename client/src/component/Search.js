import React, { useState } from 'react';
import { vidContext } from '../contexts/YoutubeVidContext';
import './component.css';
import styled from 'styled-components';

const SearchWrapper = styled.div`
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: center;
`
const InputWrapper = styled.input`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
 `

const Search = () => {
  const {search, inputHanleChange} = useState(vidContext);
  
  return (
    <SearchWrapper >
      <InputWrapper  type='text' value ={search} placeholder='search video ...' onChange={inputHanleChange} />
    </SearchWrapper>
  )
}

export default Search;


  