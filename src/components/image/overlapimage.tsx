import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

interface SingleImageProps {
  src: string;
  alt: string;
}

interface OverlapImagesProps {
  images: SingleImageProps[];
}

const OverlappingImages: React.FC<OverlapImagesProps> = ({ images }) => {
  const theme = useTheme();
  return (
    <Box style={{ display: 'flex', flexDirection: 'row' }}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          width={23}
          height={23}
          style={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '50px',
            margin: '-1px 0px -1px -9px',
            scale: 0.9,
            justifySelf: 'center',
          }}
        />
      ))}
    </Box>
  );
};

export default OverlappingImages;
