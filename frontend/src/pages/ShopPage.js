import React, {useEffect, useState} from 'react'
import Categories from "../components/Categories";
import {useDispatch, useSelector} from "react-redux";
import {getColors, getSizes, listProducts} from "../actions/productActions";
import {Link} from "react-router-dom";
import Pagination from "../components/Pagination";
import {listCategory} from "../actions/categoryActions";

const ShopPage = (props) => {
    const [sortOrder, setSortOrder] = useState('')
    const [searchKeyword, setSearchKeyword] = useState('')
    const category = props.match.params.id ? props.match.params.id : ''
    const productList = useSelector(state => state.productList)
    const {products, loading, error} = productList

    const productColors = useSelector(state => state.productColors)
    const {colors, loading: loadingColors, error: errorColors} = productColors

    const productSizes = useSelector(state => state.productSizes)
    const {sizes, loading: loadingSizes, error: errorSizes} = productSizes

    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, ] = useState(4)
    const categoryList = useSelector(state => state.categoryList)
    const {categories, loading: loadingCategories, error: errorCategories} = categoryList
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

    const [value, setValue] = useState({
        min: 1,
        max: 2000
    })
    const szObj = {}

    for(let sz of sizes){
        szObj[sz] = false
    }
    const clObj = {}

    for(let cl of colors){
        clObj[cl] = false
    }

    const [check, setCheck] = useState(szObj)
    const [colorCheck, setColorCheck] = useState(clObj)

    const filterHandler = (e) => {
        const subtitle = e.target
        subtitle.classList.toggle("active");
        subtitle.nextSibling.classList.toggle("active");
    }

    const sizeHandler = ({target}) => {
        setCheck({
            ...check,
            [target.name]: target.checked
        });
    }

    const colorHandler = ({target}) => {
        setColorCheck({
            ...colorCheck,
            [target.name]: target.checked
        });

    }


    const priceHandler = (value) => {
        setValue(value)
    }

    const getResult = () => {
        const sizesResult = []
        sizes.forEach(el => {
            if(check[el]){
                sizesResult.push(el.toLowerCase())
            }
        })
        const colorsResult = []
        colors.forEach(el => {
            if(colorCheck[el]){
                colorsResult.push(el)
            }
        })
        dispatch(listProducts(
            category,
            searchKeyword,
            sortOrder,
            false,
            sizesResult.join('-'),
            colorsResult.join('-'),
            value.min,
            value.max
            ))

    }

    const paginate = (e,pageNumber) => {
        e.preventDefault()
        const elements = document.querySelectorAll('.page-link')
        for(let element of elements){
            element.classList.remove('paginate-active')
        }
        e.target.classList.add('paginate-active')
        setCurrentPage(pageNumber)
    };

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listCategory())
        dispatch(getColors())
        dispatch(getSizes())
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(listProducts(category, searchKeyword, sortOrder))
    }, [category, sortOrder])// eslint-disable-line react-hooks/exhaustive-deps

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(listProducts(category, searchKeyword, sortOrder))
    }
    const sortHandler = (e) => {
        setSortOrder(e.target.value)
        dispatch(listProducts(category, searchKeyword, sortOrder))
    }

    return(
        <div className="pt120">
            <div className="shop-wrapper">
                {(loadingColors || loadingSizes || loadingCategories || loading) ?
                        <div className="lds-ring" style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                     :
                    (errorColors || errorSizes || errorCategories) ? <div className="sign-in-error">{errorColors || errorSizes || errorCategories}</div>
                        :
                        !categories.length ? <div>There are no categories</div>
                            :
                            !colors.length ? <div>There are no colors</div>
                                :
                                !sizes.length ? <div>There are no sizes</div>
                                    :
                                    <>
                                    <Categories
                                        categories={categories.map(category => category.name)}
                                        sizes={sizes}
                                        colors={colors}
                                        sizeHandler={sizeHandler}
                                        colorHandler={colorHandler}
                                        filterHandler={filterHandler}
                                        priceHandler={priceHandler}
                                        check={check}
                                        value={value}
                                        colorCheck={colorCheck}
                                        getResult={getResult}
                                    />
                                        <div className="products">
                                            <div className="products-filter">
                                                <div className="search">
                                                    <form onSubmit={submitHandler} className="search-bar">
                                                        <input type="search" name="search"  onChange={(e) => setSearchKeyword(e.target.value)}/>
                                                        <button className="search-btn" type="submit">
                                                            <span>Search</span>
                                                        </button>
                                                    </form>
                                                </div>
                                                <div className="sort">
                                                    <div className="sort-title">Sort</div>
                                                    <select id="mySelect" onChange={sortHandler} value={sortOrder}>
                                                        <option className="option" value="">Newest</option>
                                                        <option className="option" value="lowest">Lowest</option>
                                                        <option className="option" value="highest">Highest</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="flex">

                                                {error && <div className="sign-in-error">{error}</div>}
                                            </div>
                                            <div className="products-inner">
                                                {currentProducts.length > 0 ? currentProducts.map(product => (
                                                        <div className="product" key={product._id}>
                                                            <Link to={'/products/' + product._id} className="product__link">
                                                                <img src={product.imageUrl} className="product__img" alt="Product"/>
                                                            </Link>
                                                            <div className="product__title">{product.name}</div>
                                                            <div className="product__price">{product.price} UAH</div>
                                                        </div>
                                                    )) :
                                                    !loading && <div className="product__title" >There are no products for this criteria:(</div>
                                                }

                                            </div>
                                            <Pagination
                                                postsPerPage={productsPerPage}
                                                totalPosts={products.length}
                                                paginate={paginate}
                                            />
                                        </div>
                                    </>
                }

            </div>
        </div>
    )
}

export default ShopPage
