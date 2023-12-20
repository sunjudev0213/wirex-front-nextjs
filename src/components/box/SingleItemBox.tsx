import { Link, Stack, Typography } from '@mui/material';
import Image from 'src/components/image';
import Label from '../label';
import { SingleItemBoxProps } from './types';
import Iconify from '../iconify/iconify';

const SingleItemBox: React.FC<SingleItemBoxProps> = ({ value, src, label, href }) => (
  <Label
    direction="row"
    alignItems="center"
    spacing={2}
    sx={{
      justifyContent: 'space-between',
      width: '100%',
      mb: 2,
      p: 2,
      height: '100%',
      color: 'text.primary',
      opacity: 0.8,
    }}
  >
    <Stack direction="row" alignItems="center" spacing={2} sx={{ justifyContent: 'space-between' }}>
      <Image src={src} alt={label} width={40} height={40} />
      <Stack alignItems="flex-start">
        <Typography variant="body1">{label}</Typography>
        {value === null && href && (
          <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <Link variant="caption" color="primary" underline="none">
              Go to {label}{' '}
              <Iconify icon="oi:external-link" sx={{ ml: 0.5, width: 8, height: 8 }} />
            </Link>{' '}
          </a>
        )}
      </Stack>
    </Stack>
    <Stack>
      <Typography>{value !== null ? `${value} ETH` : '-'}</Typography>
    </Stack>
  </Label>
);

export default SingleItemBox;
