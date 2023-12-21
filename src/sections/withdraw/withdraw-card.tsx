// @mui
import { useTheme } from '@mui/material/styles';
import Stack, { StackProps } from '@mui/material/Stack';
// components
import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AggregatorBox from 'src/components/box/AggregatorBox';
import { ListItems, SingleItemBox } from 'src/components/box';
import Image from 'src/components/image';
import useCETHBalance from 'src/hooks/use-ceth-balance';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { formatAddress } from 'src/utils/format-address';
import { cowSwapSrc, oneInchSrc, paraSwapSrc } from 'src/assets/icons/imgs-ico';
import Logo from 'src/components/logo';
import OverlappingImages from 'src/components/image/overlapimage';

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

export default function WithdrawWalletCard({
  title,
  description,
  action,
  banks,
  currency = 'USD',
  instructions,
  ...other
}: Props) {
  const theme = useTheme();
  const cETHbalance = useCETHBalance();
  const { connect, connectors, error, isLoading } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const [ethValue, setEthValue] = useState();
  const [maxEth, setMaxEth] = useState<number>();
  const [selectedFirst, setSelectedFirst] = useState(true);
  const formatEth = (n) => (n % 1 !== 0 ? n.toFixed(Math.max(1, 4)) : n.toFixed(1)).toString();

  useEffect(() => {
    if (cETHbalance && isConnected) {
      setMaxEth(cETHbalance);
    }
    if (cETHbalance && !isConnected) {
      setMaxEth(0);
    }
  }, [cETHbalance, isConnected]);

  const numInputChange = (e) => {
    const { value } = e.target;

    if (value === '') {
      setEthValue(undefined);
      return;
    }

    const regExpNumOnly = /^[0-9.-]+$/;
    if (!regExpNumOnly.test(value)) {
      e.target.value = '';
      return;
    }

    const parsedValue = parseFloat(value);

    if (!Number.isNaN(parsedValue)) {
      setEthValue(parsedValue);
    } else {
      e.target.value = '';
    }
  };

  const setEthAsMax = () => {
    setEthValue(maxEth);
  };

  const connector = connectors[0];

  const txnDetails = [
    {
      label: 'Max unlock cost',
      value: 'FREE',
      info: 'Centsaving leverages gasless token approvals via ERC-2612 permits',
    },
    {
      label: 'Max transaction cost',
      value: '$65.63',
    },
    {
      label: 'Allowance',
      value: '0.0 cETH',
    },
    {
      label: 'Exchange Rate',
      value: '1 cETH : 1 ETH',
    },
  ];

  const aggregatorsInfo = [
    {
      label: '1inch',
      src: oneInchSrc,
      href: 'https://app.1inch.io',
    },
    {
      label: 'CoWSwap',
      src: cowSwapSrc,
      href: 'https://swap.cow.fi',
    },
    {
      label: 'ParaSwap',
      src: paraSwapSrc,
      href: 'https://app.paraswap.io',
    },
  ];

  const aggregateValues = [
    {
      head: {
        label: 'Use centsaving',
        value: (
          <Logo
            sx={{
              width: 23,
              height: 23,
            }}
            symbolOnly
          />
        ),
      },
      items: [
        {
          label: 'Rate:',
          value: '1 : 1',
        },
        {
          label: 'Waiting time:',
          value: '~1-4 day(s)',
        },
      ],
    },
    {
      head: {
        label: 'Use aggregators',
        value: (
          <OverlappingImages
            images={aggregatorsInfo.map((item) => ({ src: item.src, alt: item.label }))}
          />
        ),
      },
      items: [
        {
          label: 'Best Rate:',
          value: '1 : 0.9996',
        },
        {
          label: 'Waiting time:',
          value: '~1-5 minutes',
        },
      ],
    },
  ];

  const getAddressAvatar = () => `https://api.dicebear.com/7.x/identicon/jpg?seed=${address}`;

  const handleWithdraw = () => {
    if (!isConnected) {
      connect({ connector });
    }
    if (!ethValue) {
      alert('Please enter amount');
    }
    if (ethValue > maxEth) {
      alert('Insufficient balance');
    }
    if (ethValue <= maxEth) {
      alert(`Withdraw ${ethValue} ETH`);
    }
  };

  return (
    <Paper
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{
        height: { md: 1 },
        borderRadius: 1,
        position: 'relative',
        marginX: 'auto',
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
        {isConnected && (
          <Stack
            spacing={2}
            alignItems="center"
            direction="row"
            sx={{
              width: '100%',
              display: 'flex',
              gap: 1,
              justifyContent: 'space-between',
              mb: 3,
              mt: 1,
            }}
          >
            <Stack>
              <Typography variant="subtitle2">cETH Balance</Typography>
              <Typography variant="h4">{maxEth || 0}</Typography>
            </Stack>
            <Button
              direction="row"
              variant="soft"
              sx={{
                alignItems: 'center',
                backgroundColor: theme.palette.primary.dark,
                display: 'flex',
                gap: 1,
                justifyContent: 'center',
                borderRadius: 4,
              }}
              onClick={() => disconnect()}
            >
              <Typography variant="subtitle2">{formatAddress(address as string)}</Typography>
              <Image src={getAddressAvatar()} borderRadius={40} height={24} width={24} />
            </Button>
          </Stack>
        )}
        <Stack
          spacing={2}
          direction="column"
          alignItems="center"
          mb={3}
          sx={{ alignItems: 'normal', width: '100%' }}
        >
          <TextField
            variant="outlined"
            fullWidth
            label="cETH amount"
            value={ethValue}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Logo
                    sx={{
                      width: 24,
                      height: 24,
                    }}
                    symbolOnly
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={!maxEth}
                    onClick={setEthAsMax}
                  >
                    MAX
                  </Button>
                </InputAdornment>
              ),
            }}
            onChange={numInputChange}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <Grid container gap={2} alignItems="center">
            {aggregateValues.map((item, index) => (
              <AggregatorBox
                key={item.head.label}
                items={item.items}
                head={item.head}
                isSelected={(index === 0 && selectedFirst) || (index === 1 && !selectedFirst)}
                onClick={() => setSelectedFirst(index === 0)}
              />
            ))}
          </Grid>
        </Stack>

        {selectedFirst ? (
          <SingleItemBox
            value={ethValue ? formatEth(ethValue) : '0.0'}
            leftBox={<Logo symbolOnly />}
            label="Centsaving"
          />
        ) : (
          <Stack width="100%">
            {aggregatorsInfo.map((item) => (
              <SingleItemBox
                key={item.label}
                value={null}
                label={item.label}
                src={item.src}
                href={item.href}
              />
            ))}
          </Stack>
        )}

        {!isConnected && selectedFirst && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!connector.ready}
            key={connector.id}
            sx={{ gap: 2 }}
            onClick={() => connect({ connector })}
          >
            Connect wallet
            {!connector.ready && <CircularProgress size={20} color="inherit" />}
          </Button>
        )}
        {isConnected && selectedFirst && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!connector.ready}
            key={connector.id}
            sx={{ gap: 2 }}
            onClick={handleWithdraw}
          >
            Withdraw
            {!connector.ready && <CircularProgress size={20} color="inherit" />}
          </Button>
        )}
        {selectedFirst && (
          <Stack width="100%" mt={2}>
            {txnDetails.map((item) => (
              <ListItems key={item.label} item={item} />
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
