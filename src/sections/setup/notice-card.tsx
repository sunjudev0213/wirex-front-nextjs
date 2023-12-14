// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
// theme
import { bgGradient } from 'src/theme/css';
import { Paper } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  title?: string;
  description?: string;
  img?: React.ReactNode;
  action?: React.ReactNode;
}

export default function NoticeCard({ title, description, action, img, ...other }: Props) {
  const theme = useTheme();

  return (
    <Paper
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{
        height: { md: 1 },
        borderRadius: 1,
        position: 'relative',
        boxShadow: () => theme.customShadows.z20,
      }}
      {...other}
    >
      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          p: {
            xs: theme.spacing(5, 3, 0, 3),
            md: theme.spacing(3),
          },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography variant="h4" sx={{ mb: 0.2, whiteSpace: 'pre-line' }}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            maxWidth: 360,
            mb: { xs: 3, md: 4, xl: 5 },
          }}
        >
          {description}
        </Typography>

        {action && action}
      </Stack>

      {img && (
        <Stack
          component="span"
          justifyContent="center"
          sx={{
            p: { xs: 5, md: 3 },
            maxWidth: 360,
            mx: 'auto',
          }}
        >
          {img}
        </Stack>
      )}
    </Paper>
  );
}
