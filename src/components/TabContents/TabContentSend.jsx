import { useState } from 'react';
import {
  Button,
  InputAmountContainer,
  TabContent,
  TabContentSelectAsset,
  TabFooter,
  TableInputSend,
  TransactionForm,
} from '..';
import { SelectAssetContext } from '../../contexts/SelectAssetContext';
import { convertToCurrency } from '../../utilities/convert-to-currency';
import { useContext } from 'react';
import { ReactComponent as Spinner } from '../../assets/spinner.svg';
import './TabContentSend.css';

const TabContentSend = () => {
  const { isSelectAssetOpen, selectedCoin } = useContext(SelectAssetContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();

  const onSubmit = (e, defaultSubmit) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      defaultSubmit();
      setMessage('Transfer CompletedLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu velit, placerat id molestie quis, dapibus ac eros. Nunc a purus id lorem imperdiet condimentum quis ut massa. Suspendisse potenti. Nam finibus nulla et enim maximus gravida.');
      setLoading(false);
    }, 4000);
  };

  return (
    <>
      {isSelectAssetOpen ? (
        <TabContentSelectAsset />
      ) : (
        <TabContent>
          <TransactionForm onSubmit={onSubmit} type='sendCoin'>
            <div className='relative'>
              <div className={(loading || message) && 'opacity-0'}>
                <InputAmountContainer />
              </div>

              <div className='absolute left-0 top-0 w-full flex justify-center'>
                {!loading ? null : (
                  <Spinner className='spinner' width={80} height={80}></Spinner>
                )}
                {!message ? null : (
                  <div>
                    <div className='text-3xl text-brand leading-[70px] font-bold'>
                      {message}
                    </div>
                    <div
                      onClick={() => setMessage(undefined)}
                      className='opacity-50 text-center cursor-pointer hover:opacity-80'>
                      Close message Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus arcu velit, placerat id molestie quis, dapibus ac eros. Nunc a purus id lorem imperdiet condimentum quis ut massa. Suspendisse potenti. Nam finibus nulla et enim maximus gravida.
                    </div>
                  </div>
                )}
              </div>
            </div>
            <TableInputSend />
            <Button size='xl'>{`Send ${selectedCoin?.name}`}</Button>
          </TransactionForm>
          <TabFooter
            textLeft={`${selectedCoin?.symbol} balance`}
            textRight={`${selectedCoin?.balance_coin?.toFixed(6)} ${
              selectedCoin?.symbol
            } = ${convertToCurrency(selectedCoin?.balance_eur)}`}
          />
        </TabContent>
      )}
    </>
  );
};

export default TabContentSend;
