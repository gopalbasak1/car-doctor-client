import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from 'sweetalert2'


const CheckOut = () => {

    const service = useLoaderData();
    const {title, _id, price,img} = service;
    const {user} = useContext(AuthContext);

    const handleCheckOutService = e =>{
        e.preventDefault();
       const form = e.target;
       const name = form.name.value;
       const date = form.date.value;
       const email = user?.email;
       const booking = {
        customerName: name,
        email,
        img,
        date,
        service: title,
        service_id: _id,
        price: price
       }
       console.log(booking);

       fetch('http://localhost:5000/bookings',{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
            body: JSON.stringify(booking)
       })
       .then(res => res.json())
       .then(data =>{
            console.log(data);
            if(data.insertedId){
                    Swal.fire({
                    icon: "success",
                    title: "Service book successfully",
                    showConfirmButton: false,
                    timer: 1500
                    });
            }
       })

    }

    return (
        <div>
            <h2 className="text-center text-3xl">Book Service: {title}</h2>

      <form onSubmit={handleCheckOutService}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" defaultValue={user?.displayName} placeholder="Name" name="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input type="date" name="date" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="Email" defaultValue={user?.email} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Due amount</span>
          </label>
          <input type="text" defaultValue={`$`+price} className="input input-bordered" required />
        </div>
        </div>



        <div className="form-control mt-6">
          <input className="btn btn-primary" type="submit" value="Order Confirm" />
        </div>
      </form>
    </div>

    );
};

export default CheckOut;