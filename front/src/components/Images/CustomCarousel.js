import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Carousel,
    CarouselIndicators,
    CarouselControl,
    CarouselItem,
} from 'reactstrap';

class CustomCarousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0,
            animating: false,
        };
    }

    next() {
        const { items } = this.props;
        const { animating, active } = this.state;

        if (animating) {
            return;
        }
        this.setState({ active: (active === items.length - 1 ? 0 : active + 1) });
    }

    previous() {
        const { items } = this.props;
        const { animating, active } = this.state;

        if (animating) {
            return;
        }
        this.setState({ active: (active === 0 ? items.length - 1 : active - 1) });
    }

    goToIdx(idx) {
        const { animating } = this.state;

        if (animating) {
            return;
        }
        this.setState({ active: idx });
    }

    renderSlides() {
        const { items } = this.props;

        return items.map((item, idx) => (
            <CarouselItem className="carouselSlide" tag="div" key={`image-from-${idx}`} onExiting={() => this.setState({ animating: true })} onExited={() => this.setState({ animating: false })}>
                <div style={{ height: '500px !important', width: '100%' }} className="d-flex justify-content-center align-items-center">
                    <img src={item.src} alt="custom content" style={{ display: 'block', maxWidth: 'fit-content', maxHeight: '500px', alignSelf: 'center' }} />
                </div>
            </CarouselItem>
        ));
    }

    render() {
        const { items } = this.props;
        const { active } = this.state;
        return (
            <div style={{ width: '100%', background: 'black', height: '500px !important' }}>
                <style>{`.carouselSlide {max-width: 100%; height: 500px !important; background: black;}`}</style>
                <Carousel activeIndex={active} next={() => this.next()} previous={() => this.previous()}>
                        <CarouselIndicators items={items} activeIndex={active} onClickHandler={(idx) => this.goToIdx(idx)} />
                        {this.renderSlides()}
                        <CarouselControl direction="prev" directionText="Previous item" onClickHandler={() => this.previous()} />
                        <CarouselControl direction="next" directionText="Next item" onClickHandler={() => this.next()} />
                </Carousel>
            </div>
        );
    }
}

CustomCarousel.propTypes = {
    items: PropTypes.array.isRequired,
};

export default CustomCarousel;
