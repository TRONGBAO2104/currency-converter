  
//   ISSUES:
//   1. Used useMemo not right purpose: useMemo used to calculated sortedBalances but the getPriority function is still run for each element in the balances
//   2. Using both Filter and sort in only useMemo: increases complexity and reduces performance.
//   3. Calculating balancePriority and lhsPriority multiple times in the same function adds unnecessary complexity.
//   4. Key of list elements
//   5. Don't handle asynchronously: The useWalletBalances and usePrices hooks can return values ​​asynchronously, which should be handled appropriately.

//   SOLUTIONS:
//   1. Split filter and sort: Split filter and sort into two different useMemo for increased performance and clarity.
//   2. Key of list elements: should use balance.currency for React manage if delete, edit, create
//   3. Optimize useMemo: Use useMemo to minimize unnecessary recalculation, only when dependencies actually change.


// CODE REFACTORED
interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string; // Thêm field này vì đang sử dụng trong code
  }
  
  interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
  }
  
  interface Props extends BoxProps {}
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalance();
    const prices = usePrices();
  
    const getPriority = (blockchain: string): number => {
      switch (blockchain) {
        case 'Osmosis':
          return 100;
        case 'Ethereum':
          return 50;
        case 'Arbitrum':
          return 30;
        case 'Zilliqa':
          return 20;
        case 'Neo':
          return 20;
        default:
          return -99;
      }
    };
  
    const filteredBalances = useMemo(() => {
      return balances.filter((balance) => {
        return getPriority(balance.blockchain) > -99 && balance.amount > 0;
      });
    }, [balances]);
  
    const sortedBalances = useMemo(() => {
      return [...filteredBalances].sort((lhs, rhs) => {
        return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
      });
    }, [filteredBalances]);
  
    const formattedBalances = useMemo(() => {
      return sortedBalances.map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed()
      }));
    }, [sortedBalances]);
  
    const rows = useMemo(() => {
      return formattedBalances.map((balance, index) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={balance.currency} // Sử dụng giá trị duy nhất cho key
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      });
    }, [formattedBalances, prices]);
  
    return (
      <div {...rest}>
        {rows}
      </div>
    );
  };
