import React from 'react';

const Foods = ({food}) => {
    return (
        <div className="col-3 d-inline-block mt-5 border border-dark card text-center" >
          <div className="card-head ">
            <img src={`${food.img || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' || './logo192.png'}`} alt="" className="card-round-img" style={{width:'200px',height:'220px',overflow:'hidden'}} />
          </div>
          <div className="card-body">
            <div className="card-title font-weight-bold">{food.name}</div>
            <div className="card-text">
              <div className="price">{food.price} so'm</div>
              <div className="desc font-italic">{food.description || 'Juda mazali taom' }</div>
            </div>
          </div>
        </div>
    );
}

export default Foods;
