import {useState,useEffect} from 'react'
import Navbar from '../../component/navbar'
import {SERVER_URL} from '../../constants/url-strings'
import Footer from "../../component/footer"
import { getCookie,checkCookies } from 'cookies-next';

function insertAdd({vehicleList,modelList, modelYear, modelTransmission, modelEngine, modelAssembly}) {
    const [vehicelModel, setVehicleModel] = useState([])

    var year_list= []
    modelYear.forEach((element)=>{
            var requiredObj = {
                "year": element.year,
                "id" : element.id
            }
            year_list.push(requiredObj)
    })

    var transmission_list = []
    modelTransmission.forEach((element)=>{
        var requiredObj = {
            "name": element.name,
            "id" : element.id
        }
        transmission_list.push(requiredObj)
    })
    var engine_list = []
    modelEngine.forEach((element)=>{
        var requiredObj = {
            "name": element.name,
            "id" : element.id
        }
        engine_list.push(requiredObj)
    })

    var assembly_list = []
    modelAssembly.forEach((element)=>{
        var requiredObj = {
            "name": element.name,
            "id" : element.id
        }
        assembly_list.push(requiredObj)
    })

    const [seller , setSeller] = useState("")
    const [uploadImage,setUploadImage] = useState()

    useEffect(() => {
        // Update the document title using the browser API
        if(checkCookies("token")&& checkCookies("username")&& checkCookies("email")){
            setSeller(getCookie("username"))
        }
    },[]);
    const selectFile = (event) =>{
        setUploadImage(URL.createObjectURL(event.target.files[0]))

    }

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
        formData.append('AdTitle',event.target.AdTitle.value)
        formData.append('Mileage',event.target.Mileage.value)
        formData.append('ModelYearr',  event.target.vehicleYearData.options[event.target.vehicleYearData.selectedIndex].text)


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
            `${SERVER_URL}/auction`,
            {
                body: formData,
                headers: {
                    "Accept": 'application/json',
                    //"content-Type": "multipart/form-data"
                },
                method: 'POST'
            }
        )
        var response = await res.json()        
    }
    const style = {
        width: "50px",
        height: "50px"
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
                            <input id="seller" type="text" className="form-control" autoComplete="name" value={seller} required />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="AdTitle">Ad Title:</label>
                            <br />
                            <input id="AdTitle" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor="Mileage">Mileage:</label>
                            <br />
                            <input id="Mileage" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <label htmlFor="vehicleModel">Model Year:</label>
                        <div className='form-group'>
                            <select id="vehicleYearData">
                                {
                                    year_list.map((vehicle) =>{
                                        return(
                                            <option value={vehicle.id}>{vehicle.year}</option>
                                        )
                                    })
                                }
                            </select>
                         </div>
                         <br />

                        <div className='form-group'>
                            <label htmlFor="primaryDamage">Primary Damage:</label><br />
                            <input id="primaryDamage" type="text" className="form-control" autoComplete="name" required />
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
                        <label htmlFor="EngineTransmission">Engine Transmission:</label>
                        <div className='form-group'>
                            <select id="engineTransmissionData">
                                {
                                    transmission_list.map((vehicle) =>{
                                        return(
                                            <option value={vehicle.id}>{vehicle.name}</option>
                                        )
                                    })
                                }
                            </select>
                         </div>
                         <br />
                        <div className='form-group'>
                            <label htmlFor="engineType">Engine Capacity:</label><br />
                            <input id="engineCapacity" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <label htmlFor="EngineType">Engine Type:</label>
                        <div className='form-group'>
                            <select id="engineTypeData">
                                {
                                    engine_list.map((vehicle) =>{
                                        return(
                                            <option value={vehicle.id}>{vehicle.name}</option>
                                        )
                                    })
                                }
                            </select>
                         </div>
                         <br />
                        <label htmlFor="Assembly">Assembly:</label>
                        <div className='form-group'>
                            <select id="assemblyData">
                                {
                                    assembly_list.map((vehicle) =>{
                                        return(
                                            <option value={vehicle.id}>{vehicle.name}</option>
                                        )
                                    })
                                }
                            </select>
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
                        <div className='form-group'>
                            <label htmlFor="description">Ad Description:</label> <br />
                            <input id="description" type="text" className="form-control" autoComplete="name" required />
                        </div>
                        <br />
                        <input type="file" id="myFile" name="uploadImage" onChange={selectFile} />
                        <img src={uploadImage} style={style}></img>
                        <br />
                        <br />
                        <button type="submit"  className="btn btn-primary">
                        Submit
                        </button>
                        <br />
                        </form>
                </div>
            </div>
        </>
    )

}
export async function getStaticProps(){
    const response  = await fetch(`${SERVER_URL}/vehicleMake`)
    const data = await response.json()

    const modelResponse  = await fetch(`${SERVER_URL}/modelYear`)
    const dataYear = await modelResponse.json()

    const modelTransmissionRes  = await fetch(`${SERVER_URL}/engineTransmission`)
    const dataTransmission = await modelTransmissionRes.json()

    const modelEngineRes  = await fetch(`${SERVER_URL}/engineType`)
    const dataEngine = await modelEngineRes.json()

    const modelAssemblyRes  = await fetch(`${SERVER_URL}/assembly`)
    const dataAssembly = await modelAssemblyRes.json()



    const responseModel = await fetch( `${SERVER_URL}/vehicleModel`)
    const modelData = await responseModel.json()
    return {
        props : {
            vehicleList : data,
            modelList : modelData,
            modelYear : dataYear,
            modelTransmission: dataTransmission,
            modelEngine : dataEngine,
            modelAssembly : dataAssembly

        }
    }

}
export default insertAdd