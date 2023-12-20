import { Box, Typography } from '@mui/material';
import { ListItemsProps } from './types';

const ListItems: React.FC<ListItemsProps> = ({ item }) => (
  <Box
    key={item.label}
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      my: 1,
    }}
  >
    <Typography variant="body2" color="text.secondary">
      {item.label}
    </Typography>
    <Typography variant="body2">{item.value}</Typography>
  </Box>
);

export default ListItems;
