import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Questions from './Questions/Questions';
import ContainerIcons from '../../components/UI/ContainerIcons/ContainerIcons';
const state = {
    questions: [
        {question: 'Question 1', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in accumsan dui. In hac habitasse platea dictumst. Donec sit amet auctor leo. Sed venenatis posuere risus quis dictum. Vivamus ullamcorper orci vitae eros tincidunt, a aliquet lacus dapibus. Sed consectetur, est vel tincidunt imperdiet, justo est dignissim lorem, nec tincidunt lacus lacus ac risus. Cras pretium enim nec vestibulum aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;'},
        {question: 'Question 2', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in accumsan dui. In hac habitasse platea dictumst. Donec sit amet auctor leo. Sed venenatis posuere risus quis dictum. Vivamus ullamcorper orci vitae eros tincidunt, a aliquet lacus dapibus. Sed consectetur, est vel tincidunt imperdiet, justo est dignissim lorem, nec tincidunt lacus lacus ac risus. Cras pretium enim nec vestibulum aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;'},
        {question: 'Question 3', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in accumsan dui. In hac habitasse platea dictumst. Donec sit amet auctor leo. Sed venenatis posuere risus quis dictum. Vivamus ullamcorper orci vitae eros tincidunt, a aliquet lacus dapibus. Sed consectetur, est vel tincidunt imperdiet, justo est dignissim lorem, nec tincidunt lacus lacus ac risus. Cras pretium enim nec vestibulum aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;'},
        {question: 'Question 4', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in accumsan dui. In hac habitasse platea dictumst. Donec sit amet auctor leo. Sed venenatis posuere risus quis dictum. Vivamus ullamcorper orci vitae eros tincidunt, a aliquet lacus dapibus. Sed consectetur, est vel tincidunt imperdiet, justo est dignissim lorem, nec tincidunt lacus lacus ac risus. Cras pretium enim nec vestibulum aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;'}
    ]
}

const Support = (props) => {

    useEffect(() => { document.title = "Support" }, []);

    const toggleAnswer = (event,classAct) => {
        event.preventDefault();
        const parent = event.currentTarget;
        parent.classList.toggle(classAct);

        let height = null, autoHeight = null;
        let s = parent.parentElement.children[1];

        if(s.classList.contains('show')){
            autoHeight = s.offsetHeight;
            height = s.offsetHeight;
            let animate = setInterval(() => {
                height -= (autoHeight / 17);
                s.style.height = height + 'px';
                if(height <= 1){
                    clearInterval(animate);
                    s.style = '';
                    s.classList.remove('show');
                }
            },20);
        }else {
            s.classList = 'collapse show';
            autoHeight = s.offsetHeight;
            s.style.height = '0px';
            s.classList = 'collapsing';
            height = 0;
            let animate = setInterval(() => {
                height += (autoHeight / 17);
                s.style.height = height + 'px';
                if(height >= autoHeight){
                    clearInterval(animate);
                    s.style = '';
                }
            },20);
            
            s.classList = 'collapse show';
        }
    }

    return(
        <React.Fragment>
            <div className="container-fluid breadcrum">
                <div className="container">
                    <div className="inline-nav">
                        <Link to="/">Home</Link>
                        <i className="fas fa-long-arrow-alt-right"></i>
                        <a className="prevent-click" href="/">FAQ</a>
                    </div>
                </div>
            </div>
        
            <Questions questions={state.questions} click={toggleAnswer}/>
        
            <ContainerIcons />
        </React.Fragment>
    );
}

export default Support;