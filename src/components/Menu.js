import React, { useState, useEffect } from 'react'
import homeIcon from '../images/home2.png'
import menuIcon from '../images/menu1.png'
import { Link } from 'react-router-dom'

export default function Menu({token}) {
    const [menuData, setMenuData] = useState([])
    const [showAllProducts, setShowAllProducts] = useState(true)
    const [showCategoryProducts, setShowCategoryProducts] = useState(false)
    const [category, setCategory] = useState(0)
    const [isLoading, setIsLoading] = useState(true)


    useEffect(()=>{
        const getMenuData = async () => {
            try {
                const response = await fetch('https://soal.staging.id/api/menu', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        show_all: '1'
                    })
                })
                const data = await response.json()
                setMenuData(data.result.categories)
                setIsLoading(false)
            } catch (error) {
                console.log('error: ',error)
            }
        }

        getMenuData();
    }, [token])

    // filter data by category
    const allProducts = () => {
        setShowAllProducts(true)
        setShowCategoryProducts(false)
        setCategory(0)
    }
    const bestSeller = () => {
        setShowAllProducts(false)
        setShowCategoryProducts(true)
        setCategory(1)
    }
    const coffeeProducts = () => {
        setShowAllProducts(false)
        setShowCategoryProducts(true)
        setCategory(2)
    }
    const coldbrewProducts = () => {
        setShowAllProducts(false)
        setShowCategoryProducts(true)
        setCategory(3)
    }
    const chocolateProducts = () => {
        setShowAllProducts(false)
        setShowCategoryProducts(true)
        setCategory(4)
    }


  return (
    <div>
        <header className=' bg-white fixed top-0 left-0 right-0 text-center' >
            <div className="menu py-4 font-bold">
                <h1>MENU</h1>
            </div>
            {/* category menu */}
            <div className="menu-list px-4 flex gap-[2rem] font-bold overflow-x-scroll">
                <button onClick={()=>allProducts()} className={showAllProducts? "border-black border-b-4 py-4 whitespace-nowrap" : " text-gray-400 py-4 whitespace-nowrap"}>Seasonal Product</button>
                <button onClick={()=>bestSeller()} className={(showCategoryProducts && category===1) ? "border-black border-b-4 py-4 whitespace-nowrap" : " text-gray-400 py-4 whitespace-nowrap"}>Best Seller</button>
                <button onClick={()=>coffeeProducts()} className={(showCategoryProducts && category===2) ? "border-black border-b-4 py-4 whitespace-nowrap" : " text-gray-400 py-4 whitespace-nowrap"}>Coffee</button>
                <button onClick={()=>coldbrewProducts()} className={(showCategoryProducts && category===3) ? "border-black border-b-4 py-4 whitespace-nowrap" : " text-gray-400 py-4 whitespace-nowrap"}>Cold Brew</button>
                <button onClick={()=>chocolateProducts()} className={(showCategoryProducts && category===4) ? "border-black border-b-4 py-4 whitespace-nowrap" : " text-gray-400 py-4 whitespace-nowrap"}>Chocolate</button>
            </div>
        </header>

        {/* Show All Produtcs */}
        {isLoading ? <h1 className=' text-xl pt-[5rem] px-[1rem] font-bold'>Loading...</h1> : 
        <div className="all-data px-[1rem] pt-[5rem]">
        { showAllProducts &&
        menuData.map((category, index) => { return (
            <div key={index}>
                <h2 className='font-bold text-lg mt-[4rem] mb-6'>{category.category_name}</h2>
                {category.menu.map((item, index) => {
                    return (
                        <div key={index} className="flex gap-[2rem] items-start mb-[2rem]">
                            <img src={item.photo} alt={`menu-item`} width="75px" height="75px" />
                            <div className="desc-wrapper">
                                <h3 className="item-name font-bold">{item.name}</h3>
                                <p className="desc text-slate-500">{item.description}</p>
                            </div>
                            <div className="price font-semibold">{item.price}</div>
                        </div>
                    )
                })}
            </div>
        )})
        }
        </div>}

        {/* Show products by category */}
        {isLoading ? <h1 className=' text-xl pt-[5rem] px-[1rem] font-bold'>Loading...</h1> : 
        <div className="category-data px-[1rem] pb-[4rem]">
        { showCategoryProducts &&
            <div>
                <h2 className='font-bold text-lg mt-[4rem] mb-6'>{menuData[category].category_name}</h2>
                {menuData[category].menu.map((item, index) => {
                    return (
                        <div key={index} className="flex gap-[2rem] items-start mb-[2rem]">
                            <img src={item.photo} alt={`menu-item`} width="75px" height="75px" />
                            <div className="desc-wrapper">
                                <h3 className="item-name font-bold">{item.name}</h3>
                                <p className="desc text-slate-500">{item.description}</p>
                            </div>
                            <div className="price font-semibold">{item.price}</div>
                        </div>
                    )
                })}
            </div>
        }
        </div>}


         {/* Footer, Home & Menu navigation button */}
        <footer className=' bg-white grid grid-cols-2 fixed bottom-0 left-0 right-0 py-4'>
            <Link to="/" className='flex justify-center items-center'>
            <button className='flex flex-col justify-center items-center'>
                <img src={homeIcon} alt="home" width="30px" height="30px" />
                <p className='font-semibold text-sm text-gray-400'>Home</p>
            </button>
            </Link>

            <Link to="#" className='flex justify-center items-center'>
            <button className='flex flex-col justify-center items-center'>
                <img src={menuIcon} alt="menu" width="30px" height="30px" />
                <p className='font-semibold text-sm '>Menu</p>
            </button>
            </Link>
        </footer>
    </div>
  )
}
