import { useState } from 'react';

const useCETHBalance = () => {
  const [cETHBalance, setCETHBalance] = useState<number>(100);

  return cETHBalance;
};

export default useCETHBalance;
