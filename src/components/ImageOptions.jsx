import deleteImage from "../images/delete.svg";
import download from "../images/download.svg";
import { downloadImage } from "../utils/filesActions";
import Button from "./Button";
import styles from './ImageOptions.module.css';

const ImageOptions = ({ index, image, onDeleteImage }) => {
  return (
    <div className={styles.actions}>
      <Button title="Eliminar imagem" onClick={() => onDeleteImage(index)}>
        <img src={deleteImage} alt="Delete capture" />
      </Button>
      <Button title="Descargar imagem" onClick={() => downloadImage(image)}>
        <img src={download} alt="Download all snapshots" />
      </Button>
    </div>
  );
};

export default ImageOptions;
