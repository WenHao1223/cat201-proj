import React from "react";
import 'boxicons';

const SamplePage1: React.FC = () => {
    return (
        <div>
            <h1>Sample Page 1</h1>
            <p>This is the content of Sample Page 1.</p>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            <box-icon name="rocket" color="white"></box-icon>
            <i className="fa-solid fa-check"></i>
        </div>
    );
};

export default SamplePage1;
