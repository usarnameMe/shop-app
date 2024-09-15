import React, { useState } from 'react';
import styled from 'styled-components';
import Spinner from './Spinner'; 

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  position: relative;
  overflow: hidden;
`;

const StyledImage = styled.img<{ loaded: boolean }>`
  display: ${({ loaded }) => (loaded ? 'block' : 'none')};
  max-width: 100%;
  max-height: 100%;
`;

interface ImageLoaderProps {
  src: string;
  alt?: string;
  className?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ src, alt = 'Image', className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <ImageWrapper className={className}>
      {!loaded && <Spinner />} 
      <StyledImage
        src={src}
        alt={alt}
        loaded={loaded}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
    </ImageWrapper>
  );
};

export default ImageLoader;
