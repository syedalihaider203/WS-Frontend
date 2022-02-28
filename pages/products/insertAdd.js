import {useState} from 'react'

function insertAdd({vehicleList,modelList}){
    const [vehicelModel, setVehicleModel] = useState([])
    const onChange = event =>{
        debugger
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
    const registerAdd = async event => {
        const formData = new FormData()
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
        const  body = formData
        const res  = await fetch(
            'http://127.0.0.1:8000/auction',
            {
                body: body,
                headers: {
                    "Accept":"application/json"
                },
                method: 'POST'
            }
        )

        const result = await res.json()
        
    }
    return (
        <>
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
                        <button type="submit"  className="btn btn-primary">Register</button>
                        </form>
                </div>
            </div>
        </>
    )

}
export async function getStaticProps(){
    const response  = await fetch('http://127.0.0.1:8000/vehicleMake')
    const data = await response.json()

    const responseModel = await fetch('http://127.0.0.1:8000/vehicleModel')
    const modelData = await responseModel.json()

    console.log(data)
    return {
        props : {
            vehicleList : data,
            modelList : modelData
        }
    }

}
export default insertAdd