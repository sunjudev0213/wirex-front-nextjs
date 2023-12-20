import { Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AggregatorBoxProps } from './types';

const AggregatorBox: React.FC<AggregatorBoxProps> = ({ items, head, isSelected, onClick }) => {
  const theme = useTheme();
  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: {
      xs: 1,
      md: 2,
    },
    width: '100%',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
  };
  return (
    <Button
      border={1}
      alignItems="center"
      variant="outlined"
      onClick={onClick}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        flex: '1 0 0%',
        gap: 1,
        borderRadius: 1,
        padding: 2,
        width: '100%',
        whiteSpace: 'nowrap',
        ...(isSelected
          ? {
              borderColor: 'primary.main',
              backgroundColor: 'grey.light',
            }
          : {}),
      }}
    >
      <Stack alignItems="center" sx={itemStyle}>
        <Typography variant="subtitle2">{head?.label}</Typography>
        <Stack>{head?.value}</Stack>
      </Stack>

      {items?.map((item) => (
        <Stack alignItems="center" sx={itemStyle}>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {item?.label}
          </Typography>
          <Typography variant="body2">{item?.value}</Typography>
        </Stack>
      ))}
    </Button>
  );
};

export default AggregatorBox;
