import React from 'react'
import Dropzone from 'react-dropzone'


class DropZone extends React.Component
{
    render()
    {
        return(
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
            </Dropzone>
        )
    }
}

export default DropZone