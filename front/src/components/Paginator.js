// react core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// components
import {
    PaginationItem,
    PaginationLink,
    Pagination,
} from 'reactstrap';

class Paginator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
        };
    }

    getPageItem(index) {
        const { perPage, getList } = this.props;

        return (
            <PaginationItem key={`${index}pagination`}>
                <PaginationLink
                    onClick={() => {
                        this.setState({
                            page: index,
                        });
                        getList(index, perPage);
                    }}
                >
                    {index + 1}
                </PaginationLink>
            </PaginationItem>
        );
    }

    getSpaceItem(index) {
        return (
            <PaginationItem key={`${index}space`} disabled>
                <PaginationLink>
                    ...
                </PaginationLink>
            </PaginationItem>
        );
    }

    /*
    * Display number of pages in fonction of props "lenElem"
    * onClick call parent function who get element to display
    */
    renderPagesNumbers() {
        const { len, perPage } = this.props;
        const { page } = this.state;
        const pagesNums = [];
        const maxIndex = len / perPage;

        if (maxIndex <= 8) {
            for (let index = 0; index < maxIndex; index++) {
                pagesNums.push(this.getPageItem(index));
            }
        } else if (page <= 3) {
            for (let index = 0; index < 5; index++) {
                pagesNums.push(this.getPageItem(index));
            }
            pagesNums.push(this.getSpaceItem(1));
            pagesNums.push(this.getPageItem(maxIndex - 1));
        } else if (page >= maxIndex - 4) {
            pagesNums.push(this.getPageItem(0));
            pagesNums.push(this.getSpaceItem(1));
            for (let index = maxIndex - 5; index < maxIndex; index++) {
                pagesNums.push(this.getPageItem(index));
            }
        } else {
            pagesNums.push(this.getPageItem(0));
            pagesNums.push(this.getSpaceItem(1));
            for (let index = page - 1; index <= page + 1; index++) {
                pagesNums.push(this.getPageItem(index));
            }
            pagesNums.push(this.getSpaceItem(2));
            pagesNums.push(this.getPageItem(maxIndex - 1));
        }
        return pagesNums;
    }

    render() {
        return (
            <Pagination>
                {this.renderPagesNumbers()}
            </Pagination>
        );
    }
}

Paginator.propTypes = {
    len: PropTypes.number,
    perPage: PropTypes.number,
    getList: PropTypes.func,
};

Paginator.defaultProps = {
    len: 0,
    perPage: 10,
    getList: () => {},
};

export default Paginator;
