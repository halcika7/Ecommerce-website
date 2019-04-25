import React, { useState, useEffect } from 'react';
import UploadPicture from '../../../components/UI/UploadPicture/UploadPicture';
import UploadPictures from '../../../components/UI/UploadPictures/UploadPictures';
import ColorsSizesComponent from './ColorsSizesComponent';
import ResponseMessage from '../../../../users/components/UI/ResponseMessages/ResponseMessages';

const Clothing = props => {

    const [color, setColor] = useState(false);
    const [size, setSize] = useState(false);
    const [qty, setQty] = useState(1);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [singlePicture, setSinglePicture] = useState(false);
    const [multyPicture, setMultyPicture] = useState(false);

    const [options, setOptions] = useState([]);

    const [choosenColors, setChoosenColors] = useState([]);
    const [choosenSizes, setChoosenSizes] = useState([]);
    const [, setAllSizesSelected] = useState(false);
    
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
        const newChoosenSizes = [...choosenSizes];
        if(!size) { failedMessages('Please provide Product Size'); return; }
        if(findOptionIndex === -1) {
            if(!singlePicture) { failedMessages('You didn\'t choose any fetured picture for option'); return; }
            if(!multyPicture) { failedMessages('You didn\'t choose any pictures for option'); return; }
            newOptions.push({ color, options: [{ quantity: +(qty), aditionalPrice: +(price), discount: +(discount), size }], featuredPicture: singlePicture, pictures: multyPicture });
            newChoosenSizes.push(size);
            setShowImagesChooser(false);
        }else {
            const findSize = newOptions[findOptionIndex].options.find(option => option.size === size);
            if(findSize) { failedMessages('You added that option'); return; }
            newOptions[findOptionIndex].options.push({ quantity: +(qty), aditionalPrice: +(price), discount: +(discount), size });
            newChoosenSizes.push(size);
        }
        setQty(1);setPrice(0);setDiscount(0);setSize(false);setOptions(newOptions);setChoosenSizes(newChoosenSizes);
    }

    const finalizeOptions = e => {
        e.preventDefault();
        const newChoosenColors = [...choosenColors];
        newChoosenColors.push(color);
        setChoosenColors(newChoosenColors);
        setChoosenSizes([]);
        setColor(false);
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

    const allSizesSelectedChange = bool => {
        if(bool) {
            const newChooseColors = [...choosenColors];
            newChooseColors.push(color);
            setChoosenColors(newChooseColors);
            setColor(false);
            props.setOptions(options);
        } 
        setAllSizesSelected(bool);
    }

    const colorChange = color => {
        if(options.length > 0) {
            const newChoosenSizes = [];
            options.forEach(option => option.color === color && option.options.forEach(opt => newChoosenSizes.push(opt.size)) );
            setChoosenSizes(newChoosenSizes);
        }
        setColor(color);
    }

    const failedMessages = (message) => { setFailedMessage(message); setTimeout(() => setFailedMessage(false), 4000);}

    return (
        <div className="form-group mb-20">
            {failedMessage && <ResponseMessage message={failedMessage} ClassName="Danger"/>}
            <div className='row m-0'>
                <div className='col-sm-6'>
                    <label className="">Select Color</label>
                    <ColorsSizesComponent setColor={colorChange} color={true} choosenColors={choosenColors} value={color}/>
                </div>
                <div className='col-sm-6'>
                    <label className="">Select Size</label>
                    <ColorsSizesComponent setSize={setSize} sizes={true} choosenSizes={choosenSizes} value={size} setAllSizesSelected={allSizesSelectedChange}/>
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="row">
                    <div className="col-md-4">
                        <label className="mb-2">Enter Quantity</label>
                        <input type="number" className="w-100" placeholder='Enter Option Quantity' name='qty' onChange={inputOnChange} value={qty} min='1'/>
                    </div>
                    <div className="col-md-4">
                        <label className="mb-2">Enter Aditional Price</label>
                        <input type="number" className="w-100" placeholder='Enter Option Aditional Price' name='aditionalPrice' onChange={inputOnChange} value={price} min='0'/>
                    </div>
                    <div className="col-md-4">
                        <label className="mb-2">Enter Discount</label>
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
                {color && size && singlePicture && multyPicture && <button type='button' className='btn btn-primary mt-4 d-block' onClick={addOption}>Add Option</button>}
                {options.length > 0 && <button type='button' className='btn btn-primary mt-4 d-block' onClick={finalizeOptions}>Finalize Option</button>}
            </div>
        </div>
    );
}

export default Clothing;