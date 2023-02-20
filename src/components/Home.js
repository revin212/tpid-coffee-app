import React, { useEffect, useState } from 'react'
import Logo from '../images/logo technopartner.png'
import arrowRight from '../images/arrow-right.svg'
import homeIcon from '../images/home1.png'
import closeIcon from '../images/close-icon.svg'
import menuIcon from '../images/menu2.png'
import { Link } from 'react-router-dom'

export default function Home({token}) {
    const [fetchedData, setFetchedData] = useState({})
    const [banners, setBanners] = useState([])
    const [showQR, setShowQR] = useState(false)

    useEffect(()=>{
        const getHomeData = async () => {
            try {
                const response = await fetch('https://soal.staging.id/api/home', {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                // console.log(response)
                const data = await response.json()
                // console.log(data)
                setFetchedData(data.result)
                setBanners(data.result.banner)
                // console.log(fetchedData)
            } catch (error) {
                console.log('error: ',error)
            }
        }

        getHomeData();
    }, [token])

  return (
    <div>
        <header className=' h-[4rem] flex px-[1rem] mb-[4rem]'>
            <img src={Logo} alt="logo-technopartner" />
        </header>

        <div className="profile-desc px-[2rem]">
            <div className="greeting mb-[1.5rem]">
                <p>{fetchedData.greeting},</p>
                <h1 className='font-bold'>{fetchedData.name}</h1>
            </div>            
            <div className="qr-saldo-points box-shadow flex justify-between items-center py-3 px-6">
                    <button onClick={()=>setShowQR(true)} >
                        <img src={fetchedData.qrcode} alt="qr-code" width="50px" height="50px" />
                    </button>
                    <div className="saldo-points-wrapper flex gap-[4rem]">
                    <div className="saldo-points">
                        <p>Saldo</p>
                        <p>Points</p>
                    </div>
                    <div className="saldo-points-value text-right">
                        <p className='font-bold'>Rp {fetchedData.saldo}</p>
                        <p className=' font-bold text-blue-300'>{fetchedData.point}</p>
                    </div>
                    </div>
                    {/* <img src={} alt="" /> */}
            </div>
        </div>

        {showQR && <div className="qr-popup h-full min-h-screen fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-white z-10">
              <button onClick={()=>setShowQR(false)} className=' absolute right-0 top-0 m-4'>
                  <img src={closeIcon} alt="close" width="30px" height="30px"/>
              </button>
              <h2 className='mb-[2rem]'>Show the QR Code below to the cashier.</h2>
              <img src={fetchedData.qrcode} alt="qr-code" width="300px" height="300px" />
          </div>}

        <div className="image-slider">
            <div className="image px-[3rem] py-[1rem] w-full h-[200px] flex justify-center items-center">
                <img src={banners[0]} alt="logo-technopartner" />
            </div>
            <div className="buttons px-[2rem] flex justify-between items-center">
                <div className="select-img flex gap-[0.6rem]">
                    <button className='radio-btn active'></button>
                    <button className='radio-btn'></button>
                    <button className='radio-btn'></button>
                    <button className='radio-btn'></button>
                    <button className='radio-btn'></button>
                </div>
                <div className="view-all flex gap-2">
                    <p className=' text-blue-300'>View all</p>
                    <img src={arrowRight} alt="right-arrow" width='14px' height='14px' />    
                </div>                
            </div>
        </div>

        <footer className=' bg-white grid grid-cols-2 fixed bottom-0 left-0 right-0 py-4'>
            <Link to="#" className='flex justify-center items-center'>
            <button className='flex flex-col justify-center items-center'>
                <img src={homeIcon} alt="home" width="30px" height="30px" />
                <p className='font-semibold text-sm'>Home</p>
            </button>
            </Link>

            <Link to="/menu" className='flex justify-center items-center'>
            <button className='flex flex-col justify-center items-center'>
                <img src={menuIcon} alt="menu" width="30px" height="30px" />
                <p className='font-semibold text-sm text-gray-400'>Menu</p>
            </button>
            </Link>
        </footer>
    </div>
  )
}
