import React, { useEffect, useState } from 'react';
import CurrencyConverter from './CurrencyConverter';

const Url = 'https://v6.exchangerate-api.com/v6/59a9aea14797daa6305067e4/latest/AZN';

const Home = () => {
  // Mövcud valyuta növlərini içeren dizi.
  const [currencyOptions, setCurrencyOptions] = useState([]); 
  //  Əsas valyuta növü.
  const [currencyApp, setCurrencyApp] = useState();
  // Hədəf valyuta növü.
  const [tocurrencyApp, setToCurrencyApp] = useState();
  // Xarici valyuta məbləği.
  const [quantity, setQuantity] = useState(1);
  // Valyutanın hansı istiqamətdə (baza-hədəf və ya hədəf-baza) hesablandığını göstərən boolean.
  const [quantityCurrency, setQuantityCurrency] = useState(true);
  // Baza və hədəf valyuta arasındakı məzənnə deyisim miqdarı.
  const [exchangequantity, setExchangeQuantity] = useState();
  // Bütün valyuta məzənnələrini seçen obyekt.
  const [currencyRates, setCurrencyRates] = useState({});

  let toQuantity, fromQuantity;
  // Temel döviz miktarını hedef dövize çevirme
  if (quantityCurrency) {
    fromQuantity = quantity; // esas valyuta miktarı, kullanıcının girdiği değer
    toQuantity = quantity * exchangequantity; // Hedef valyuta çevrilen miktar

    //  Hedef döviz miktarını temel dövize çevirme
  } else {
    toQuantity = quantity; // Hedef valyuta miktarı, kullanıcının girdiği değer
    fromQuantity = quantity / exchangequantity; // esas valyutaya çevrilen miktar
  }

  useEffect(() => {
    fetch(Url)
      .then(res => res.json())
      .then(data => {
        if (data.result === 'success') {
            //  valyutaalrın ilk anahtarını alıyoruz (genellikle temel döviz birimi)
          const firstCurrencyapp = Object.keys(data.conversion_rates)[0];
          //  valyutaalrı seçeneklere (dropdown menüsü) ekliyoruz
          setCurrencyOptions([...Object.keys(data.conversion_rates)]);
        //  esas döviz birimini ayarlıyoruz
          setCurrencyApp(data.base);
           //  Hedef döviz birimini ayarlıyoruz (genellikle temel döviz birimi olarak alınan ilk döviz birimi)
          setToCurrencyApp(firstCurrencyapp);
          // esas valyutanı hedef valyutaya olan değişim oranını ayarlıyoruz
          setExchangeQuantity(data.conversion_rates[firstCurrencyapp]);
            //  Tüm valyutaları içeren bir nesneyi ayarlıyoruz
          setCurrencyRates(data.conversion_rates);
        } else {
          console.error('API yanıtında beklenen veri bulunamadı.', data.error);
        }
      })
      .catch(error => {
        console.error('API yanıtında beklenen veri bulunamadı.', error);
      });
  }, []); 

  // Seçilen valyuta  ve miqdar değiştikçe  useEffect
  useEffect(() => {
    // API çağrısını yapmadan önce currencyApp ve tocurrencyApp'in her ikisi de null değilse kontrol edilir.
    if (currencyApp != null && tocurrencyApp != null) {
      // API çağrısı için URL, temel para birimi (currencyApp) ve hedef para birimi (tocurrencyApp) ile oluşturulur.
      fetch(`${Url}?base=${currencyApp}&symbols=${tocurrencyApp}`)
        .then(res => res.json())
        .then(data => {
          if (data.result === 'success') {
              // API yanıtından hedef para birimi için valyuta çıkarılır.
            const exchangeRate = data.conversion_rates[tocurrencyApp];
            // Döviz kuru ve miktar kullanılarak durumu güncellenir, çevrilmiş miktar hesaplanır.
            setExchangeQuantity(exchangeRate);
            setToQuantity(quantity * exchangeRate);
          } else {
            console.error('API yanıtında beklenen veri bulunamadı.', data.error);
          }
        })
        .catch(error => {
          console.error('API yanıtında beklenen veri bulunamadı.', error);
        });
    }
  }, [currencyApp, tocurrencyApp, quantity]);

   // Kullanıcının Miktarı Değiştirmesi Durumunda Çalışan Fonksiyon
  function settleChange(e) {
     // Olay nesnesinden (event) input alanındaki yeni değeri alır.
    const value = e.target.value;
     // Alınan değeri state içindeki quantity değişkenine atar.
    setQuantity(value);
     // setQuantityCurrency fonksiyonu ile quantityCurrency state'ini true olarak ayarlar. Bu, valyutanın esas para birimine ait olduğunu belirtir.
    setQuantityCurrency(true);
  }
  // Hedef valyuta novu Değiştirmesi Durumunda Çalışan Fonksiyon
  function settleToChange(e) {
    const value = e.target.value;
    setQuantity(value);
    setQuantityCurrency(false);
  }

  return (
    <>
      <div className='login'>
        <h1 className='convertname'>Convert</h1>
        <CurrencyConverter 
          currencyOptions={currencyOptions} // Kullanılabilir valyutaları içeren bir dizi
          selecttoCurrencyapp={currencyApp} // Seçilen temel valyuta
          onChangeapp={e => setCurrencyApp(e.target.value)}  // Kullanıcının esas valyuta değiştirdiğinde çağrılacak fonksiyon
          quantity={fromQuantity} // Giriş yapılan miktar
          onChangeQuantity={settleChange}  // Giriş yapılan miktarın değiştirildiği durumlarda çağrılacak fonksiyon
  
        />
        <div className='convert-true'>=</div>
        <CurrencyConverter 
          currencyOptions={currencyOptions}
          selecttoCurrencyapp={tocurrencyApp} 
          onChangeapp={e => setToCurrencyApp(e.target.value)}
          quantity={toQuantity}
          onChangeQuantity={settleToChange}
        />
      </div>
    </>
  );
};

export default Home;
