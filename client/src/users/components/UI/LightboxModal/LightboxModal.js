import React, { useEffect, useState } from 'react';

import './LightboxModal.css';

const LightboxModal = ({ images, setShow, i }) => {

    const [Images, setImages] = useState([]);
    const [index, setIndex] = useState(0);

    const [bounceRight, setBounceRight] = useState(false);
    const [bounceLeft, setBounceLeft] = useState(false);

    useEffect(() => {
        document.getElementById("modal").focus();
    }, []);

    useEffect(() => {
        setImages(images)
    }, [images]);

    useEffect(() => {
        setIndex(i)
    }, [i]);

    const onKeyUp = (e, name=null) => {
        e.preventDefault();
        if((e.keyCode === 37 || name === 'left') && index !== 0) {
            setIndex(index - 1);
        }
        if((e.keyCode === 37 || name === 'left') && index === 0) {
            setBounceLeft(true);
            setTimeout(() => setBounceLeft(false), 1000);
        }
        if((e.keyCode === 39 || name === 'right') && index !== (Images.length - 1)) {
            setIndex(index + 1);
        }
        if((e.keyCode === 39 || name === 'right') && index === (Images.length - 1)) {
            setBounceRight(true);
            setTimeout(() => setBounceRight(false), 1000);
        }
    }

    return (
        <div id='modal' className="light-box-modal open" tabIndex='0' onKeyUp={onKeyUp}>
            <div className="modal-content">
                <div className="close-modal" onClick={() => setShow(false)}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="main-img">
                    <div className={bounceRight ? 'img bounceRight' : bounceLeft ? 'img bounceLeft' : 'img'}>
                        <img src={Images[index]} className='show' alt={Images[index]} />
                        <div className="img-description">
                            <span className="img-alt show"></span>
                        </div>
                        <div className="number-imgs">
                            <span className="img-active show">{index+1}</span>/
                            <span className="img-length show">{Images.length}</span>
                        </div>
                    </div>
                    <div className="arrow" onClick={(e) => onKeyUp(e,'left')}>
                        <i className="fas fa-arrow-left"></i>
                    </div>
                    <div className="arrow" onClick={(e) => onKeyUp(e,'right')}>
                        <i className="fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LightboxModal;
