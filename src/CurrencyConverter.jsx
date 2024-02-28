import React from 'react'

const CurrencyConverter = (props) => {
// props objesinden gerekli değerlerin çıkarılması
  const {
    currencyOptions,
    selecttoCurrencyapp,
    onChangeapp,
    quantity,
    onChangeQuantity

  } = props
  return ( 
    <>

    <div  className='input-box convertinput'>
       {/* Miktarı girmek için input alanı */}
    <input value={String(quantity)} onChange={onChangeQuantity} type='number' />


         {/* Döviz birimi seçimi için dropdown (select) kutusu  */}
        <select value={selecttoCurrencyapp}  onChange={ onChangeapp} className='input' >
          {currencyOptions.map(currency =>(
            
            // Her bir döviz birimi için bir option oluşturulur
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}

            
        </select>
    </div>



  </>
  ) 
}

export default CurrencyConverter