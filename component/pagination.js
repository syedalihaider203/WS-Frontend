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
        var string = `.pagination${pagevalue}` //dynamic class name for clicked page anchor tag
        var paginationLength = document.getElementById('paginationGroup').children.length
        for ( let i=0; i<paginationLength; i++ ){
            var valueNew = `.pagination${i+1}`; //dynamic class names
            document.querySelector(valueNew).classList.remove('active'); //remove active clicked classes from other pages if clicked
        }
            document.querySelector(string).classList.add('active'); //add active class to clicked page.
        
    }
    return (
        <>
        {/* Dyanmic classNames are given to each anchor tag. */}
         <a className={`pagination${pages}`} onClick={handleClick} >{pages}</a>
        </>
    )
}

export default pagination