import React from 'react'
import { Link } from 'react-router-dom'
import { Editor } from '@monaco-editor/react'
import { useState, useEffect } from 'react'
function Editorc() {
    const [srcDoc, setSrcDoc] = useState('');
    const [js, setJs] = useState('console.log("Hello World");');
     useEffect(() => {
        const timer = setTimeout(() => {
            const sou=`
            <html>
            <head>
                <title>CodeX Output</title>
                </head>
            <body>
                <script>
                    ${js}
                </script>   
                </body>
                </html>
            `
            setSrcDoc(sou);
        }, 1000);
        return () => clearTimeout(timer);
    
      }, [js]);
    
  return (
    <div className='w-full h-full bg-gray-700 absolute top-[0%] left-0 flex justify-center items-center'      > 
    <div className="w-[100%] h-[100%] bg-gray-800 absolute top-0 left-0 z-10">
        <h1 className="text-center text-white font-bold text-4xl">CodeX Editor</h1>
        <Link to="/" className="absolute top-8 left-[44px] "><button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Home</button></Link>
    </div> 
    <div className="w-[100%] h-[50%] bg-gray-800 absolute flex justify-center items-center top-[17%] left-0 z-20">
        
    <Editor 
        defaultLanguage="javascript"
        defaultValue={js}
        onChange={(value) => setJs(value) ||  ""}
        className='text-white font-bold text-xl w-[100%] ml-[28%] h-[100%] bg-gray-100 border-none'          
        options={{
          fontSize: 18,
          minimap: {enabled: false},
          wordWrap: 'on',
            lineNumbers: 'on', 
            tabSize: 2,
            flex: 'true',
            justifyContent: 'center',
            alignItems: 'center',
          automaticLayout: true,
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden'
          }}}
        theme="vs-dark"
      />
       <iframe
        srcDoc={srcDoc}
        title="Output"
        sandbox="allow-scripts"
        frameBorder="0"
        width="50%"
        
        height="100%"
      />
    
    </div>
    </div> 
  )
}

export default Editorc