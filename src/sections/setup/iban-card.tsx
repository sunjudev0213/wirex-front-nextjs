// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
// theme
import { bgGradient } from 'src/theme/css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { useCallback, useRef, useState } from 'react';

// ----------------------------------------------------------------------

interface BankType {
  name: string;
  iban: string;
  bal: number;
}

interface Props extends StackProps {
  title?: string;
  description?: string;
  banks: BankType[];
  action?: React.ReactNode;
  currency?: string;
  instructions?: string[];
}

export default function IbanCard({
  title,
  description,
  action,
  banks,
  currency = 'USD',
  instructions,
  ...other
}: Props) {
  const theme = useTheme();

  const dialog = useBoolean();

  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');

  const [selectedBank, setSelectedBank] = useState(banks[0]);

  const handleStandingOrder = (bank: string) => {
    const selectBank = banks.find((b) => b.name === bank || b.iban === bank);
    if (!selectBank) {
      return;
    }
    setSelectedBank(selectBank);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);

  const handleClickOpen = useCallback(
    (scrollType: DialogProps['scroll']) => () => {
      dialog.onTrue();
      setScroll(scrollType);
    },
    [dialog]
  );

  const ibanProcessed = () =>
    `${selectedBank?.iban?.slice(0, 4).toUpperCase()} ${selectedBank?.iban
      ?.slice(4, 8)
      .toUpperCase()} ${selectedBank?.iban?.slice(8, 12).toUpperCase()} ${selectedBank?.iban
      ?.slice(12, 16)
      .toUpperCase()}`;

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
        <Typography variant="h4" sx={{ mb: 0.1, whiteSpace: 'pre-line' }}>
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
        <Stack spacing={2} direction="row" alignItems="center" mb={3} sx={{ alignItems: 'normal' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                variant="outlined"
                label="Generated IBAN"
                value={ibanProcessed()}
                disabled
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="Balance"
                value={`${currency}  ${selectedBank?.bal}`}
                disabled
              />
            </Grid>
          </Grid>

          {banks && banks.length > 0 && (
            <Stack width="100%">
              <Typography variant="h4" sx={{ mb: 0.1, whiteSpace: 'pre-line' }}>
                Set up standing order
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  maxWidth: 360,
                  mb: { xs: 0, md: 1, xl: 1 },
                }}
              >
                From your banking software
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  maxWidth: 360,
                  mb: { xs: 3, md: 4, xl: 5 },
                }}
              >
                Use your banking software to set up a standing order to this bank account number.
              </Typography>

              <FormControl variant="outlined" sx={{ mb: 2, width: '100%' }}>
                <InputLabel>Select Bank</InputLabel>
                <Select
                  value={selectedBank?.name}
                  label="Select your bank"
                  onChange={(e) => handleStandingOrder(e.target.value as string)}
                >
                  {banks.map((bank) => (
                    <MenuItem key={bank.name} value={bank.name}>
                      {bank.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          )}
        </Stack>

        {action && action}
        <Button
          variant="contained"
          color="primary"
          sx={{ alignSelf: 'flex-end' }}
          onClick={handleClickOpen('paper')}
        >
          Set up standing order
        </Button>

        <Dialog open={dialog.value} onClose={dialog.onFalse} scroll={scroll}>
          <DialogTitle sx={{ pb: 2 }}>Standing order setup instructions</DialogTitle>

          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText ref={descriptionElementRef} tabIndex={-1}>
              {[...new Array(50)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                )
                .join('\n')}
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={dialog.onFalse}>Cancel</Button>

            <Button variant="contained" onClick={dialog.onFalse}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Paper>
  );
}
