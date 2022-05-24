import {useState} from 'react'
import Navbar from '../../component/navbar'

function insertAdd({vehicleList,modelList}) {
    const [vehicelModel, setVehicleModel] = useState([])
    const onChange = event =>{
        var temp_list= []
        modelList.forEach((element)=>{
            if(element.make_id == Number(event.target.value)){
                var requiredObj = {
                    "name": element.name,
                    "id" : element.id
                }
                temp_list.push(requiredObj)
            }

        })
        setVehicleModel(temp_list)


    }
    const registerAdd =async (event) => {
        event.preventDefault()

        var formData = new FormData()
        formData.append('seller',event.target.seller.value)
        formData.append('bodyStyle',event.target.primaryDamage.value)
        formData.append('primaryDamage',event.target.bodyStyle.value)
        formData.append('vehicleType',event.target.vehicleType.value)
        formData.append('vehicleColor',event.target.vehicleColor.value)
        formData.append('vehicleMake',event.target.vehicleMakeData.options[event.target.vehicleMakeData.selectedIndex].text)
        formData.append('vehicleModel',event.target.vehicleModelData.options[event.target.vehicleModelData.selectedIndex].text)
        formData.append('engineType',event.target.engineType.value)
        formData.append('price',event.target.price.value)
        formData.append('image',event.target.uploadImage.files[0])
        
        var res  = await fetch(
            'http://localhost:8080/auction',
            {
                body: formData,
                headers: {
                    "Accept": 'application/json',
                    // "content-Type": "multipart/form-data"
                },
                method: 'POST'
            }
        )
        debugger
        var response = await res.json()
        
        event.preventDefault()
    }
    return (
        <>
        <Navbar />
            <div className="container">
                <h1 className="center"> Insert Details</h1>
                <div>
                    <form onSubmit={registerAdd}>
                        <div className='formGroup'>
                            <label htmlFor="name">Seller:</label><br />
                            <input id="seller" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="primaryDamage">Primary Damage:</label><br />
                            <input id="primaryDamage" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="bodyStyle">Body Style:</label>
                            <br />
                            <input id="bodyStyle" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="vehicleType">Vehicle Type:</label> <br />
                            <input id="vehicleType" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="vehicleColor">Vehicle Color:</label><br />
                            <input id="vehicleColor" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="engineType">Engine Type:</label><br />
                            <input id="engineType" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <label htmlFor="vehicleMake">Vehicle Make:</label>
                        <br />
                        <div className='form-group'>
                            <select id="vehicleMakeData" onChange={onChange}>
                            {
                                vehicleList.map((vehicle)=>{
                                    return(
                                        <option value={vehicle.id}>{vehicle.name}</option>

                                    )
                                })
                            }
                            </select>
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="vehicleModel">Vehicle Model:</label>
                            <select id="vehicleModelData">
                                {
                                    vehicelModel.map((vehicle) =>{
                                        return(
                                            <option value={vehicle.id}>{vehicle.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="price">Price:</label> <br />
                            <input id="price" type="number" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <input type="file" id="myFile" name="uploadImage" />
                        <br />
                        <br />
                        <button type="submit"  className="btn btn-primary">
                        Submit
                        </button>
                        </form>
                </div>
            </div>
            <Footer />
        </>
    )

}
export async function getStaticProps(){
    const response  = await fetch('http://localhost:8080/vehicleMake')
    const data = await response.json()

    const responseModel = await fetch('http://localhost:8080/vehicleModel')
    const modelData = await responseModel.json()
    return {
        props : {
            vehicleList : data,
            modelList : modelData
        }
    }

}
export default insertAdd