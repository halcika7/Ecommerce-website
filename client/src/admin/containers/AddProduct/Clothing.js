import React, { useState, useEffect } from 'react';
import UploadPicture from '../../components/UI/UploadPicture/UploadPicture';
import UploadPictures from '../../components/UI/UploadPictures/UploadPictures';
import ColorsComponent from './ColorsComponent';
import ResponseMessage from '../../../users/components/UI/ResponseMessages/ResponseMessages';

const Clothing = props => {

    const [sizes] = useState(['XXS','XS','S','M','L','XL','2XL','3XL','4XL','5XL']);
    const [color, setColor] = useState(false);
    const [qty, setQty] = useState(1);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [size, setSize] = useState(false);
    const [options, setOptions] = useState([]);
    
    const [singlePicture, setSinglePicture] = useState(false);
    const [multyPicture, setMultyPicture] = useState(false);

    const [failedMessage, setFailedMessage] = useState(false);
    const [showImagesChooser, setShowImagesChooser] = useState(true);

    useEffect(() => {
        const findIndex = options.findIndex(option => option.color === color);
        findIndex !== -1 && setShowImagesChooser(false);
        findIndex === -1 && setShowImagesChooser(true);
    }, [color]);

    const addOption = e => {
        e.preventDefault();
        const newOptions = [...options];
        const findOptionIndex = newOptions.findIndex(option => option.color === color);
        if(!size) { failedMessages('Please provide Product Size'); return; }
        if(findOptionIndex === -1) {
            if(!singlePicture) { failedMessages('You didn\'t choose any fetured picture for option'); return; }
            if(!multyPicture) { failedMessages('You didn\'t choose any pictures for option'); return; }
            newOptions.push({ color, options: [{ quantity: +(qty), aditionalPrice: +(price), discount: +(discount), size }], featuredPicture: singlePicture, pictures: multyPicture });
            setShowImagesChooser(false);
        }else {
            const findSize = newOptions[findOptionIndex].options.find(option => option.size === size);
            if(findSize) { failedMessages('You added that option'); return; }
            newOptions[findOptionIndex].options.push({ quantity: +(qty), aditionalPrice: +(price), discount: +(discount), size });
        }
        setQty(1);setPrice(0);setDiscount(0);setSize(false);setOptions(newOptions);
    }

    const finalizeOptions = e => {
        e.preventDefault();
        props.setOptions(options);
    }

    const inputOnChange = e => {
        if(parseInt(e.target.value) >= 0 && e.target.name !== 'discount') {
            e.target.name === 'qty' && setQty(e.target.value);
            e.target.name === 'aditionalPrice' && setPrice(e.target.value);
        }
        if(parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 99 && e.target.name === 'discount') {
            setDiscount(e.target.value);
        }
    }
    
    const setFeaturedPicture = (name, file) => setSinglePicture(file);

    const failedMessages = (message) => { setFailedMessage(message); setTimeout(() => setFailedMessage(false), 4000);}

    return (
        <div className="form-group mb-20">
            {failedMessage && <ResponseMessage message={failedMessage} ClassName="Danger"/>}
            <label className="col-12"><span className="label-tooltip"> Select Color </span></label>
            <div className="col-12">
                <div className="options">
                    <ColorsComponent setColor={setColor}/>
                    {color && <div className="form-group mb-4 w-100">
                        <label className='d-block'> <span className="label-tooltip"> Select Sizes </span></label>
                        <div className='radioButtonsSizes'>
                            {sizes.map(size => 
                                <div className="radioButtonContainerSizes" key={size} data-tooltip={size}>
                                    <input type="radio"name="size"onChange={e => setSize(size)}/>
                                    <span className={"checkmark"}>{size}</span>
                                </div>
                            )}
                        </div>
                        <div className="row mt-4 mb-4">
                            <div className="col-md-4">
                                <span className="w-100 mb-2 d-block">Enter Quantity</span>
                                <input type="number" className="w-100" placeholder='Enter Option Quantity' name='qty' onChange={inputOnChange} value={qty} min='1'/>
                            </div>
                            <div className="col-md-4">
                                <span className="w-100 mb-2 d-block">Enter Aditional Price</span>
                                <input type="number" className="w-100" placeholder='Enter Option Aditional Price' name='aditionalPrice' onChange={inputOnChange} value={price} min='0'/>
                            </div>
                            <div className="col-md-4">
                                <span className="w-100 mb-2 d-block">Enter Discount</span>
                                <input type="number" className="w-100" placeholder='Enter Option Discount' name='discount' onChange={inputOnChange} value={discount} min='0'/>
                            </div>
                        </div>
                        {showImagesChooser && 
                        <React.Fragment>
                            <label className="d-block">Featured Picture</label>
                            <UploadPicture name="featuredPicture" change={setFeaturedPicture} />
                            <label className="d-block mt-4">Upload Pictures</label>
                            <UploadPictures name="multyPictures" change={setMultyPicture}/>
                        </React.Fragment>}
                    </div>}
                </div>
                {color && size && singlePicture && multyPicture && <button type='button' className='btn btn-primary' onClick={addOption}>Add Option</button>}
                {options.length > 0 && <button type='button' className='btn btn-primary' onClick={finalizeOptions}>Finalize Options</button>}
            </div>
        </div>
    );
}

export default Clothing;