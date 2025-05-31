import React from 'react'
import CppEditor from './Cpp'
import { Link } from 'react-router-dom'

function Array() {
  return (
    <div className='absolute top-[90%] left-0 w-full h-full flex justify-center items-center'>
        <div className="w-full h-full bg-gray-800 shadow-lg rounded-lg flex justify-center items-center">

            <div className="w-full h-full bg-white rounded-lg flex flex-col justify-center items-center">   
                <h1 className='text-2xl font-bold text-gray-800 mb-4'>Array Example</h1>
                <p className='text-gray-600 mb-4'>This is a simple example of an array in JavaScript.</p>
                <div className='bg-gray-200 p-4 rounded-lg'>
                    <pre className='text-sm text-gray-800'>
                        {`const fruits = ['Apple', 'Banana', 'Cherry']`}
                    </pre>;  
                    </div>
                    <p className='text-gray-600 mb-4'>In this example, we have an array called <code>fruits</code> that contains three strings: <code>'Apple'</code>, <code>'Banana'</code>, and <code>'Cherry'</code>.</p>
                    <div className="mt-4 w-full flex justify-center items-center bg-gray-800 p-4 rounded-lg text-white"> 
                            <pre className='text-sm text-white'>
                                {`#include <iostream>\n using namespace std;\n\nint main() {\n    string fruits[] = {"Apple", "Banana", "Cherry"};\n    cout << fruits[0] << endl; // Output: Apple\n    return 0;\n}`}
                            </pre>  
                            
                        </div>
                <div className='mt-4 text-gray-600'>
                    <p>In this C++ example, we declare an array of strings called <code>fruits</code> and initialize it with the same values. We then print the first element of the array, which is <code>'Apple'</code>.</p>
                    </div>
                    <div className="problemset mt-4 w-full flex justify-center items-center bg-gray-800 p-4 rounded-lg text-white">
                        

                            <div className="w-full flex justify-center items-center mt-4">
                              <h1 className="text-2xl font-bold text-white" >
                                Problemset of Array
                              </h1>

                                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4" onClick={() => {
                                     // Placeholder for actual solution submission logic   
                                     {
                                        window.location.href = '/prob'; // Redirect to C++ editor
                                     }
                                    Start
                                }}>
                                    Start
                                </button>
                            </div>
                    </div>
                    </div>
                    </div>
            </div> 

)

}

export default Array