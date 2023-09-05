import Zoom from 'react-medium-image-zoom';
import './Modal.module.css';

export const Modal = ({src, alt}) => (
  <Zoom>
    <img
      alt={alt}
      src={src}
      width="100%"
    />
  </Zoom>
);