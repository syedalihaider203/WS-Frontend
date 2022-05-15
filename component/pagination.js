import { useRouter } from 'next/router'
import {useState,useContext } from 'react'


function pagination ({pages}) {
    const router = useRouter()
    const [pagevalue, setpagevalue] = useState(0);

    const handleClick = (e) => {
        //query page clicked from pagination.
        //apppends dynamic className ('active) when clicked on page. 
        setpagevalue(pagevalue=e.target.innerHTML)
        router.push(`?page=${e.target.innerHTML}`)
        var string = `.pagination${pagevalue}`
        document.querySelector(string).classList.add('active');
    }
    return (
        <>
        {/* Dyanmic classNames are given to each anchor tag. */}
         <a className={`pagination${pages}`} onClick={handleClick} >{pages}</a>
        </>
    )
}

export default pagination