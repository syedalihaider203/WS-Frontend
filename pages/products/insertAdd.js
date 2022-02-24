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
        var obj = {
            seller : event.target.seller.value,
            primaryDamage : event.target.primaryDamage.value,
            bodyStyle : event.target.bodyStyle.value,
            vehicleType : event.target.vehicleType.value,
            vehicleColor : event.target.vehicleColor.value,
            engineType : event.target.engineType.value,
            price : event.target.price.value,
            image : event.target.uploadImage.files[0]
        }

        const formData = new FormData()
        formData.append('seller',event.target.seller.value)
        formData.append('bodyStyle',event.target.primaryDamage.value)
        formData.append('vehicleType',event.target.vehicleType.value)
        formData.append('vehicleColor',event.target.vehicleColor.value)
        formData.append('engineType',event.target.engineType.value)
        formData.append('price',event.target.price.value)
        formData.append('image',event.target.uploadImage.files[0])
        const  body = formData
        const res  = await fetch(
            'http://127.0.0.1:8000/auction',
            {
                body: body,
                headers: {
                    "Accept":"application/json",
                    "Content-Type": "multipart/form-data"   
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
                <form onSubmit={registerAdd}>
                <label htmlFor="name">Seller</label>
                <input id="seller" type="text" autoComplete="name" required />
                <br />
                <br />
                <label htmlFor="name">Primary Damage</label>
                <input id="primaryDamage" type="text" autoComplete="name" required />
                <br />
                <br />
                <label htmlFor="name">Body Style</label>
                <input id="bodyStyle" type="text" autoComplete="name" required />
                <br />
                <br />
                <label htmlFor="name">Vehicle Type</label>
                <input id="vehicleType" type="text" autoComplete="name" required />
                <br />
                <br />
                <label htmlFor="name">Vehicle Color</label>
                <input id="vehicleColor" type="text" autoComplete="name" required />
                <br />
                <br />
                <label htmlFor="name">Engine Type</label>
                <input id="engineType" type="text" autoComplete="name" required />
                <br />
                <br />
                <label htmlFor="vehicleMake">Vehicle Make</label>
                <select onChange={onChange}>
                    {
                        vehicleList.map((vehicle)=>{
                            return(
                                <option value={vehicle.id}>{vehicle.name}</option>

                            )
                        })
                    }

                </select>
                <br />
                <br />
                <label htmlFor="vehicleModel">Vehicle Model</label>
                <select id="vehicleModelData">
                    {
                        vehicelModel.map((vehicle) =>{
                            return(
                                <option value={vehicle.id}>{vehicle.name}</option>
                            )
                        })
                    }

                </select>
                <br />
                <br />

                <label htmlFor="name">Price</label>
                <input id="price" type="number" autoComplete="name" required />
                <br />
                <br />
                <input type="file" id="myFile" name="uploadImage" />
                <br />
                <br />
                <button type="submit">Register</button>
                </form>
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