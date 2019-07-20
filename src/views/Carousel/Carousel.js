import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import banner1 from '../../../public/image/banner1.jpg';
import banner2 from '../../../public/image/banner2.jpg';
import banner3 from '../../../public/image/banner3.jpg';
import banner4 from '../../../public/image/banner4.jpg';
import banner5 from '../../../public/image/product.jpg';
import './Carousel.css';

class Carousel extends Component {

    render() {
        return(
            <div className="container carousel-holder">
                <div id="banner" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li className="active" data-target="#banner" data-slide-to="0"></li>
                        <li data-target="#banner" data-slide-to="1"></li>
                        <li data-target="#banner" data-slide-to="2"></li>
                        <li data-target="#banner" data-slide-to="3"></li>
                        <li data-target="#banner" data-slide-to="4"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-interval="3000">
                            <img src={banner1} alt="Sale" className="d-block w-100 imgSize" />
                        </div>

                        <div className="carousel-item" data-interval="3000">
                            <img src={banner2} alt="Sale" className="d-block w-100 imgSize" />
                        </div>

                        <div className="carousel-item" data-interval="3000">
                            <img src={banner3} alt="Sale" className="d-block w-100 imgSize" />
                        </div>
                        <div className="carousel-item" data-interval="3000">
                            <img src={banner4} alt="Sale" className="d-block w-100 imgSize" />
                        </div>
                        <div className="carousel-item" data-interval="3000">
                            <img src={banner5} alt="Sale" className="d-block w-100 imgSize" />
                        </div>
                    </div>

                    <a href="#banner" className="carousel-control-prev" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon fa-border border-dark bg-dark" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a href="#banner" className="carousel-control-next" role="button" data-slide="next">
                        <span className="carousel-control-next-icon fa-border border-dark bg-dark" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
    }
}

export default Carousel;